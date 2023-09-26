package com.cloud0072.apigrid.datasheet.domain;


import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.domain.JSONEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Field implements JSONEntity {

    //    @Id
    private String fieldId;
    private String name;
    private Integer type;
    private JSONObject property;

}
