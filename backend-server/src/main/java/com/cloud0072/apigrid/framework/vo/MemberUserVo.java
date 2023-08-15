package com.cloud0072.apigrid.framework.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class MemberUserVo {

    /**
     * member
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long memberId;

    private String memberName;

    private Integer status;

    private Integer isAdmin;

    private Integer isDeleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    private Date updateTime;

    private String createBy;

    private String updateBy;

    private String spcId;

    /**
     * team
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long teamId;

    private String teamIds;

    private String teamName;

    private String teamNames;

    /**
     * user
     */
    @JsonSerialize(using = ToStringSerializer.class)
    private Long userId;

    private String username;

    private String password;

    private String newPwd;

    private String mobile;

    private String email;

    private String nickName;

    private String avatar;

    private Integer avatarColor;

    private Integer isLocked;

}
