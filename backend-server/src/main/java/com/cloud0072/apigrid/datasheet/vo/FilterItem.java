package com.cloud0072.apigrid.datasheet.vo;

import lombok.Data;

@Data
public class FilterItem {

    private String rel;
    private String fieldId;
    private String symbol;
    private Object value;

}
