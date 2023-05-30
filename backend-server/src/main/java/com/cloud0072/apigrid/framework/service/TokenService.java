package com.cloud0072.apigrid.framework.service;

import com.cloud0072.apigrid.framework.domain.User;

import javax.servlet.http.HttpServletRequest;

public interface TokenService {

    User getUser(HttpServletRequest request);

    void setUser(User user);

    void delUser(String token);

    String createToken(User user);

    void verifyToken(User user);

    void refreshToken(User user);

    void setUserAgent(User user);

    String getUsernameFromToken(String token);
}
