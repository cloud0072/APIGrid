package com.cloud0072.apigrid.framework.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cloud0072.apigrid.common.domain.BaseEntity;
import com.cloud0072.apigrid.common.domain.TreeEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import lombok.experimental.Accessors;

import java.io.Serializable;
import java.util.Date;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@TableName(keepGlobalPrefix = true, value = "menu_node")
public class MenuNode extends BaseEntity implements TreeEntity {

    @TableId(value = "id", type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    private String nodeId;

    /**
     * 父节点nodeId
     */
    private String parentId;

    private String nodeName;

    /**
     * 前一个节点的Id 排序使用
     */
    private String preNodeId;

    private String cover;

    private String icon;

    /**
     * 节点类型
     * 0 root
     * 1 folder
     * 2 datasheet
     * 3 form
     * 4 dashboard
     * 5 mirror
     */
    private Integer nodeType;

    private Integer isDeleted;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long createBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long updateBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    @JsonIgnore
    @Override
    public Serializable getKey() {
        return nodeId;
    }

    @JsonIgnore
    @Override
    public String getTitle() {
        return nodeName;
    }

}
