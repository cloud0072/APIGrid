package com.cloud0072.apigrid.datasheet.domain;

import cn.hutool.json.JSONArray;
import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.annotation.AutoId;
import com.cloud0072.apigrid.common.domain.JSONEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Datasheet implements JSONEntity {

    @AutoId
    @Id
    private Long _id;
    private String dstId;
    private String dstName;
    /**
     * 表格配置
     * id
     * name
     * type
     * style
     * columns: []
     */
    private JSONArray views;
    /**
     * 列配置
     * id
     * name
     * type
     * property
     */
    private JSONObject fieldMap;

    private Integer isDeleted;
    private Long createBy;
    private Date createTime;
    private Long updateBy;
    private Date updateTime;

}
