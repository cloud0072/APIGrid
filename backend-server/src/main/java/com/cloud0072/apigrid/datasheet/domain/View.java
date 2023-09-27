package com.cloud0072.apigrid.datasheet.domain;

import cn.hutool.json.JSONArray;
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
public class View implements JSONEntity {

    //    @Id
    private String id;
    private String name;
    private Integer type;
    private Integer rowHeightLevel; // 1: 24, 2: 32, 3: 48, 4: 96
    private Integer frozenColumnCount;
    private JSONObject style;
    private JSONObject filterInfo;
    private JSONArray groupInfo;
    private JSONArray columns;

}
