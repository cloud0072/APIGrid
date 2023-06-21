package com.cloud0072.apigrid.common.util;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

/**
 * 文件处理工具类
 *
 * @author ruoyi
 */
public class FileUtils {
    /**
     * 获取不带后缀文件名称 /profile/upload/2022/04/16/ruoyi.png -- ruoyi
     *
     * @param fileName 路径名称
     * @return 没有文件路径和后缀的名称
     */
    public static String getBaseName(String fileName) {
        return FileUtils.getBaseName(fileName);
    }

    public static String getExtension(String fileName) {
        return FileUtils.getExtension(fileName);
    }

    public static String getDatePathName() {
        String fileName = IdUtils.fastSimpleUUID();
        String datePath = DateTimeFormatter.ofPattern("yyyy/MMdd").format(LocalDateTime.now());
        return "assist/" + datePath + "/" + fileName;
    }

}
