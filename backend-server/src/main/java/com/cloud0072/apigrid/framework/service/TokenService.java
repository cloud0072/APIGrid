package com.cloud0072.apigrid.framework.service;

import com.cloud0072.apigrid.common.domain.LoginUser;

import javax.servlet.http.HttpServletRequest;

public interface TokenService {

    LoginUser getUser(HttpServletRequest request);

    void setUser(LoginUser user);

    void delUser(String token);

    String createToken(LoginUser user);

    void verifyToken(LoginUser user);

    void refreshToken(LoginUser user);

    void setUserAgent(LoginUser user);

    String getUsernameFromToken(String token);
}
