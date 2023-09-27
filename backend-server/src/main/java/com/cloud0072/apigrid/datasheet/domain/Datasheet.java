package com.cloud0072.apigrid.datasheet.domain;

import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.annotation.AutoId;
import com.cloud0072.apigrid.common.domain.JSONEntity;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.annotation.Transient;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
    private List<JSONObject> views;
    /**
     * 列配置
     * id
     * name
     * type
     * property
     */
    private Map<String, JSONObject> fieldMap;

    private Integer isDeleted;
    private Long createBy;
    private Date createTime;
    private Long updateBy;
    private Date updateTime;

    @Transient
    @JsonIgnore
    private Map<String, JSONObject> fieldNameMap;

    public Map<String, JSONObject> getFieldNameMap() {
        if (this.fieldNameMap != null) {
            return this.fieldNameMap;
        }
        this.fieldNameMap = new HashMap<>();
        if (fieldMap != null) {
            fieldMap.values().forEach(v -> fieldNameMap.put(v.getStr("name"), v));
        }
        return fieldNameMap;
    }

}
