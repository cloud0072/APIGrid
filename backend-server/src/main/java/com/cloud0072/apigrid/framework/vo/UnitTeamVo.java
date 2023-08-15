package com.cloud0072.apigrid.framework.vo;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UnitTeamVo {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long unitId;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long teamId;

    private String teamName;

    private Integer memberCount;

    private Boolean hasChildren;

    private Boolean hasChildrenTeam;

}
