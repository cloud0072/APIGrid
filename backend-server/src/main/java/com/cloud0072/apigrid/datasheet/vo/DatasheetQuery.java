package com.cloud0072.apigrid.datasheet.vo;

import lombok.Data;

import java.util.List;

@Data
public class DatasheetQuery {

    /**
     * 大于0
     */
    private Integer pageSize;
    /**
     * 从1开始
     */
    private Integer pageNum;
    /**
     * 查询数组
     */
    private List<FilterItem> params;
    /**
     * name | fieldId
     */
    private String type;


}
