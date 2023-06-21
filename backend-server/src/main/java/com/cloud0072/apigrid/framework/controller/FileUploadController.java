package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.common.constant.MinioProperties;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.FileUtils;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.Asset;
import com.cloud0072.apigrid.framework.service.AssetService;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.MinioClient;
import io.minio.http.Method;
import lombok.SneakyThrows;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Date;

@RequestMapping("/upload")
@RestController
public class FileUploadController {

    @Autowired
    private MinioClient minioClient;

    @Autowired
    private MinioProperties minioProperties;

    @Autowired
    private AssetService assetService;

    /**
     * 例子
     * const file = uni.getFileSystemManager().readFileSync(this.uploadFile);
     * getPreSignedPutUrl({
     * fileName: this.uploadFile,
     * mimeType,
     * md5,
     * }).then(response => {
     * const { url, method, token, id } = response.data;
     * return pureFly.request(url, file, {
     * headers: { "Content-Type": "multipart/form-data" },
     * method: method
     * })
     * })
     *
     * @param data
     * @return
     */
    @SneakyThrows
    @GetMapping("/getPreSignedPutUrl")
    public AjaxResult getPreSignedPutUrl(Asset data) {
        if (StringUtils.isEmpty(data.getFileName())) {
            throw new ServiceException("fileName不能为空");
        }
        var suffix = FileUtils.getExtension(data.getFileName());
        var token = FileUtils.getDatePathName() + (StringUtils.isEmpty(suffix) ? "" : "." + suffix);
//        var fileUrl = minioProperties.getEndpoint() + "/" + minioProperties.getBucketName() + "/" + token;
        String url = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(Method.PUT)
                .bucket(minioProperties.getBucketName())
                .object(token)
                .build());
        Asset asset = Asset.builder()
                .bucketName(minioProperties.getBucketName())
                .token(token)
                .fileName(data.getFileName())
                .mimeType(data.getMimeType())
                .md5(data.getMd5())
                .createTime(new Date())
                .createBy(SecurityUtils.getUserId())
                .build();
        assetService.save(asset);
        var result = AjaxResult.success();
        result.put("url", url);
        result.put("method", "PUT");
        result.put("id", asset.getId());
        result.put("token", asset.getToken());
        return result;
    }

}
