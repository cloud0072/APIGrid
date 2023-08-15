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
public class UnitUserVo {

    @JsonSerialize(using = ToStringSerializer.class)
    private Long unitId;

    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;

    private String originName;

    private String nickName;

    private String email;

    private String mobile;

    private String avatar;

    private Integer avatarColor;

    private String teamNames;

    private Boolean isAdmin;

    private Boolean isLocked;

}
