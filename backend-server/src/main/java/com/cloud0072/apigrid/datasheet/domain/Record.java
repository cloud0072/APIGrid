package com.cloud0072.apigrid.datasheet.domain;

import com.cloud0072.apigrid.common.annotation.AutoId;
import com.cloud0072.apigrid.common.domain.JSONEntity;
import com.cloud0072.apigrid.common.util.IdUtils;
import com.cloud0072.apigrid.common.util.SecurityUtils;
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
public class Record implements JSONEntity {

    @AutoId
    @Id
    private String _id;
    private String recId;
    private String dstId;
    private Integer isDeleted;
    private String createBy;
    private Date createTime;
    private String updateBy;
    private Date updateTime;

    public Record(String dstId) {
        this._id = IdUtils.snowflakeId().toString();
        this.recId = IdUtils.getRecordId();
        this.dstId = dstId;
        this.isDeleted = 0;
        this.createBy = SecurityUtils.getUserId().toString();
        this.updateBy = SecurityUtils.getUserId().toString();
        this.createTime = new Date();
        this.updateTime = new Date();
    }

}
