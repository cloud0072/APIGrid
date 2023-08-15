package com.cloud0072.apigrid.common.domain;

import com.cloud0072.apigrid.framework.domain.UnitUser;
import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;
import java.util.List;

/**
 * 用户
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
//@EqualsAndHashCode(callSuper = true)
public class LoginUser implements UserDetails {

    private Long userId;

    private String nickName;

    private String username;

    private String password;

    private String mobile;

    private String email;

    private String avatar;

    private Integer avatarColor;

    /**
     * 管理员 0 否 1 是
     */
    private Integer isAdmin;

    /**
     * 状态 0 未锁定 1 锁定
     */
    private Integer isLocked;

    /**
     * isDeleted
     */
    private Integer isDeleted;

    private String token;

    private Long loginTime;

    private Long expireTime;

    private String ipaddr;

    private String browser;

//    /**
//     * 关联成员 / 空间站
//     */
//    private List<UnitUser> userList;

    public LoginUser(UnitUser user) {
        this.userId = user.getId();
        this.nickName = user.getNickName();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.mobile = user.getMobile();
        this.email = user.getEmail();
        this.avatar = user.getAvatar();
        this.avatarColor = user.getAvatarColor();
        this.isAdmin = user.getIsAdmin();
        this.isLocked = user.getIsLocked();
        this.isDeleted = user.getIsDeleted();
    }

    @Override
    public String getUsername() {
        return username;
    }

    @JsonIgnore
    @Override
    public String getPassword() {
        return password;
    }

    /**
     * 账户是否未过期,过期无法验证
     */
    @JsonIgnore
    @Override
    public boolean isAccountNonExpired() {
        return true;
    }

    /**
     * 指示是否已过期的用户的凭据(密码),过期的凭据防止认证
     *
     * @return
     */
    @JsonIgnore
    @Override
    public boolean isCredentialsNonExpired() {
        return true;
    }

    /**
     * 指定用户是否解锁,锁定的用户无法进行身份验证
     *
     * @return
     */
    @JsonIgnore
    @Override
    public boolean isAccountNonLocked() {
        return this.isLocked == 0;
    }

    @JsonIgnore
    @Override
    public boolean isEnabled() {
        return this.isDeleted == 0;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return null;
    }

}
