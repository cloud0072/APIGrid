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
public class RoleMemberVo {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long unitId;

    private Integer unitType;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long unitRefId;

    private String unitName;

    private Integer memberCount;

    private String teamNames;

    private String avatar;

    private Integer avatarColor;

    private String nickName;

    private Boolean isAdmin;

}
