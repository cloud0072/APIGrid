package com.cloud0072.apigrid.datasheet.domain;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.data.annotation.Id;

import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Datasheet {

    @Id
    private String dstId;

    private String dstName;

    private String views;

    private Date createTime;

    private Date updateTime;

}
