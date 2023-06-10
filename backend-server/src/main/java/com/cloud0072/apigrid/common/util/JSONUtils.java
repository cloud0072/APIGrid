package com.cloud0072.apigrid.common.util;

import com.alibaba.fastjson2.JSONObject;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

/**
 * 使用系统默认的序列化方案
 */
public class JSONUtils {

    private static ObjectMapper objectMapper = null;

    public static String toJSONString(Object object) {
        if (objectMapper == null) {
            objectMapper = SpringUtils.getBean(ObjectMapper.class);
        }
        try {
            return objectMapper.writeValueAsString(object);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

    public static JSONObject toJSONObject(Object object) {
        String jsonString = object instanceof String ? (String) object : toJSONString(object);
        return JSONObject.parseObject(jsonString);
    }

    public static <T> T parseJSONString(String jsonString, Class<T> tClass) {
        if (objectMapper == null) {
            objectMapper = SpringUtils.getBean(ObjectMapper.class);
        }
        try {
            return objectMapper.readValue(jsonString, tClass);
        } catch (JsonProcessingException e) {
            return null;
        }
    }

}
