package com.cloud0072.apigrid.framework.domain;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import com.cloud0072.apigrid.common.domain.BaseEntity;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.*;
import lombok.experimental.Accessors;

import java.util.Date;

/**
 * 节点权限 / 列权限
 */
@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@TableName(keepGlobalPrefix = true, value = "menu_control")
public class MenuControl extends BaseEntity {

    @TableId(value = "id", type = IdType.ASSIGN_ID)
    @JsonSerialize(using = ToStringSerializer.class)
    private Long id;

    /**
     * 权限Id
     * nodeId 或 nodeId-fldId
     */
    private String ctrId;

    /**
     * 单元Id
     */
    private String unitId;

    /**
     * 控制范围
     * 1 node   权限
     * 2 view   权限
     * 3 field  权限
     */
    private Integer controlType;

    /**
     * 权限类型
     * 1 owner      授权--删除-修改-新建-查看
     * 2 editor     删除-修改-新建-查看
     * 3 updater    修改-新建-查看
     * 4 reader     查看
     */
    private Integer permissionType;

    private Integer isDeleted;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long updateBy;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

}
