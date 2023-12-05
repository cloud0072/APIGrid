package com.cloud0072.apigrid.framework.controller;

import cn.hutool.core.util.PageUtil;
import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cloud0072.apigrid.common.constant.MinioProperties;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.exception.BackendException;
import com.cloud0072.apigrid.common.util.FileUploadUtils;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.FileAsset;
import com.cloud0072.apigrid.framework.service.FileAssetService;
import io.minio.GetPresignedObjectUrlArgs;
import io.minio.ListObjectsArgs;
import io.minio.MinioClient;
import io.minio.Result;
import io.minio.errors.*;
import io.minio.http.Method;
import io.minio.messages.Item;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.security.InvalidKeyException;
import java.security.NoSuchAlgorithmException;
import java.sql.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;

@Slf4j
@RequestMapping("/upload")
@RestController
public class FileUploadController {

    @Autowired
    private MinioClient minioClient;

    @Autowired
    private MinioProperties minioProperties;

    @Autowired
    private FileAssetService fileAssetService;

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
    public AjaxResult getPreSignedPutUrl(FileAsset data) {
        if (StringUtils.isEmpty(data.getFileName())) {
            throw new BackendException("fileName不能为空");
        }
        var suffix = FileUploadUtils.getExtension(data.getFileName());
        var token = FileUploadUtils.getDatePathName() + (StringUtils.isEmpty(suffix) ? "" : "." + suffix);
        var fileUrl = minioProperties.getEndpoint() + "/" + minioProperties.getBucketName() + "/" + token;
        var putUrl = minioClient.getPresignedObjectUrl(GetPresignedObjectUrlArgs.builder()
                .method(Method.PUT)
                .bucket(minioProperties.getBucketName())
                .object(token)
                .build());
        FileAsset fileAsset = FileAsset.builder()
                .bucketName(minioProperties.getBucketName())
                .token(token)
                .fileName(data.getFileName())
                .mimeType(data.getMimeType())
                .md5(data.getMd5())
                .updateTime(new Date())
                .updateBy(SecurityUtils.getUserId())
                .build();
        fileAssetService.save(fileAsset);
        var result = AjaxResult.success();
        result.put("putUrl", putUrl);
        result.put("token", token);
        result.put("fileUrl", fileUrl);
        result.put("id", fileAsset.getId().toString());
        return result;
    }

    @GetMapping("/getFileAssetByIds/{ids}")
    public AjaxResult getFileAssetByIds(@PathVariable("ids") String ids) {
        var fileIds = Arrays.asList(ids.split(","));
        var list = fileAssetService.list(new QueryWrapper<FileAsset>().in("id", fileIds));
        return AjaxResult.success(list);
    }

//    @GetMapping("/listFileAsset")
//    public AjaxResult listFileAsset(FileAsset fileAsset) {
//        var fileList = new ArrayList<String>();
//        try {
//            fileList.addAll(getFolderFiles(fileAsset.getBucketName(), ""));
//        } catch (Exception e) {
//            e.printStackTrace();
//        }
//        return AjaxResult.success(fileList);
//    }
//
//    private List<String> getFolderFiles(String bucket, String prefix) throws Exception {
//        var fileList = new ArrayList<String>();
//        Iterable<Result<Item>> results = minioClient.listObjects(
//                ListObjectsArgs.builder().bucket(bucket).prefix(prefix).build()
//        );
//        log.info("listObjects: bucket: {}, prefix: {}", bucket, prefix);
//        for (Result<Item> it : results) {
//            var f = it.get();
//            if (!f.isDir() && !f.isDeleteMarker()) {
//                fileList.add(f.objectName());
//            } else if (f.isDir()) {
//                fileList.addAll(getFolderFiles(bucket, f.objectName()));
//            }
//        }
//        return fileList;
//    }

}
