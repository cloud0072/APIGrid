package com.cloud0072.apigrid.common.domain;

import cn.hutool.core.date.DatePattern;
import cn.hutool.core.date.DateUtil;

import java.time.LocalDateTime;
import java.util.Date;
import java.util.HashMap;

/**
 * 辅助自定义返回结果，自行将key下划线改为驼峰
 * com.ruoyi.common.utils.ResultMap
 *
 * @author zhi
 * @date 2020-12-24
 */
public class ResultMap extends HashMap<String, Object> {

    @Override
    public Object put(String key, Object value) {
        String stringKey = underlineToCamelHump(key);
        if (value instanceof Date) {
            value = DateUtil.format((Date) value, DatePattern.NORM_DATETIME_PATTERN);
        }
        if (value instanceof LocalDateTime) {
            value = DateUtil.format((LocalDateTime) value, DatePattern.NORM_DATETIME_PATTERN);
        }
        if (value instanceof Long && ((Long) value).compareTo(1000000000000L) > 0) {
            value = String.valueOf(value);
        }
        return super.put(stringKey, value);
    }

    private String underlineToCamelHump(String inputString) {
        StringBuilder sb = new StringBuilder();

        boolean nextUpperCase = false;
        for (int i = 0; i < inputString.length(); i++) {
            char c = inputString.charAt(i);
            if (c == '_') {
                if (sb.length() > 0) {
                    nextUpperCase = true;
                }
            } else {
                if (nextUpperCase) {
                    sb.append(Character.toUpperCase(c));
                    nextUpperCase = false;
                } else {
                    sb.append(c);
                }
            }
        }
        return sb.toString();
    }

    public String getString(String key) {
        Object o = super.get(key);
        return o == null ? null : o.toString();
    }

    public Long getLong(String key) {
        Object o = super.get(key);
        return o == null ? null : Long.valueOf(o.toString());
    }

    public Date getDate(String key) {
        Object o = super.get(key);
        return o == null ? null : (Date) o;
    }

}
