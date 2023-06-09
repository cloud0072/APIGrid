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
 * 文件上传附件
 */
@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
@TableName(keepGlobalPrefix = true, value = "asset")
public class Asset extends BaseEntity {

    @TableId(value = "id", type = IdType.ASSIGN_ID)
    private Long id;

    private String bucketName;

    private String token;

    private String mimeType;

    private String md5;

    private String fileName;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long createBy;

}
