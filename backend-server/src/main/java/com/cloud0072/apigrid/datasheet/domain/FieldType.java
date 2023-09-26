package com.cloud0072.apigrid.datasheet.domain;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum FieldType {
    TEXT(1),        //文本
    NUMBER(2),      //数字
    DATETIME(3),    //日期
    SELECT(4),      //选项
    FILE(5),        //文件
    MEMBER(6),      //成员
    //    LINK(7),      //神奇关联
//    LOOKUP(8),    //神奇引用
//    CALC(9),      //智能公式
    NOT_SUPPORT(99),//未知
    ;

    private final int type;

    public static FieldType create(int type) {
        for (FieldType t : FieldType.values()) {
            if (t.getType() == type) {
                return t;
            }
        }
        return NOT_SUPPORT;
    }
}
