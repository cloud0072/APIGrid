package com.cloud0072.apigrid.datasheet.domain;

import lombok.*;
import org.springframework.data.annotation.Id;

import java.io.Serializable;
import java.util.Date;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
@EqualsAndHashCode
public class Datasheet implements Serializable {

    @Id
    private String dstId;

    private String dstName;

    private String views;

    private Date createTime;

    private Date updateTime;

}
