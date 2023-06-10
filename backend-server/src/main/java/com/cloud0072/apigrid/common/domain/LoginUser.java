package com.cloud0072.apigrid.common.domain;

import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.domain.User;
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
public class LoginUser implements UserDetails {

    private Long userId;

    private String username;

    private String password;

    private String mobile;

    private String email;

    private String avatar;

    private String nickName;

    /**
     * 状态 0 未锁定 1 锁定
     */
    private Integer isLocked;

    /**
     * isEnabled
     */
    private Integer isDeleted;

    private String token;

    private Long loginTime;

    private Long expireTime;

    private String ipaddr;

    private String browser;

    /**
     * 关联成员 / 空间站
     */
    private List<UnitMember> memberList;

    public LoginUser(String username, String password) {
        this.username = username;
        this.password = password;
    }

    public LoginUser(User user) {
        this.userId = user.getUserId();
        this.username = user.getUsername();
        this.password = user.getPassword();
        this.mobile = user.getMobile();
        this.email = user.getEmail();
        this.avatar = user.getAvatar();
        this.nickName = user.getNickName();
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
