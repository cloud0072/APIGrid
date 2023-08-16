package com.cloud0072.apigrid.datasheet.domain;

import com.cloud0072.apigrid.common.annotation.AutoId;
import lombok.*;
import lombok.experimental.Accessors;
import org.springframework.data.annotation.Id;

@Data
@Builder(toBuilder = true)
@NoArgsConstructor
@AllArgsConstructor
@Accessors(chain = true)
@EqualsAndHashCode(callSuper = false)
public class Datasheet {

    @AutoId(AutoId.IdType.SNOWFLAKE)
    @Id
    private Long id;

    private String dstId;

    private String dstName;

    private String nodeId;

    private String views;

}
