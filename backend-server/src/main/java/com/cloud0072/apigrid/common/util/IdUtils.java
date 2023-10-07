package com.cloud0072.apigrid.common.util;

import cn.hutool.core.lang.Snowflake;
import cn.hutool.core.util.IdUtil;
import lombok.var;

/**
 * ID生成器工具类
 *
 * @author ruoyi
 */
public class IdUtils {

    private static final Snowflake SNOWFLAKE = IdUtil.getSnowflake(1, 1);

    // 没有 i o w q 合计32个字符
    private static final String GENERATE_ID_STRING = "1234567890abcdefghjklmnprstuvxyz";

    public static String NODE = "nod";
    public static String DASHBOARD = "dsb";
    public static String MIRROR = "mir";
    public static String FORM = "for";
    public static String DATASHEET = "dst";
    public static String FIELD = "fld";
    public static String RECORD = "rec";
    public static String VIEW = "viw";

    /**
     * 获取随机UUID
     *
     * @return 随机UUID
     */
    public static String randomUUID() {
        return UUID.randomUUID().toString();
    }

    /**
     * 简化的UUID，去掉了横线
     *
     * @return 简化的UUID，去掉了横线
     */
    public static String simpleUUID() {
        return UUID.randomUUID().toString(true);
    }

    /**
     * 获取随机UUID，使用性能更好的ThreadLocalRandom生成UUID
     *
     * @return 随机UUID
     */
    public static String fastUUID() {
        return UUID.fastUUID().toString();
    }

    /**
     * 简化的UUID，去掉了横线，使用性能更好的ThreadLocalRandom生成UUID
     *
     * @return 简化的UUID，去掉了横线
     */
    public static String fastSimpleUUID() {
        return UUID.fastUUID().toString(true);
    }

    public static Long snowflakeId() {
        return SNOWFLAKE.nextId();
    }

    public static String getNewId(String prefix, int length) {
        var str = new StringBuilder();
        for (int i = 0; i < length; i++) {
            var value = Math.floor(Math.random() * GENERATE_ID_STRING.length());
            str.append(GENERATE_ID_STRING.charAt(Double.valueOf(value).intValue()));
        }
        return prefix + str;
    }

    public static String getDatasheetId() {
        return getNewId(DATASHEET, 8);
    }

    public static String getRecordId() {
        return getNewId(RECORD, 8);
    }

    public static String getFieldId() {
        return getNewId(FIELD, 8);
    }

    public static String getViewId() {
        return getNewId(VIEW, 8);
    }
}
