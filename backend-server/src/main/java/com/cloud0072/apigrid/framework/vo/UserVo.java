package com.cloud0072.apigrid.framework.vo;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class UserVo {

    /**
     * user
     */
    private Long userId;

    private String username;

    private String password;

    private String newPwd;

    private String mobile;

    private String email;

    private String nickName;

    private String avatar;

    private Integer isLocked;

    protected Integer isDeleted;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    protected Date createTime;

    @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
    protected Date updateTime;

    protected String createBy;

    protected String updateBy;

    /**
     * 空间站Id
     */
    private String spcId;

    /**
     * member
     */
    private Long memberId;

    private String memberName;

    private Integer isAdmin;

    /**
     * team
     */
    private Long teamId;

    private String teamIds;

    private String teamName;

}
