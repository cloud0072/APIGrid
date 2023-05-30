package com.cloud0072.apigrid.framework.service;

import com.cloud0072.apigrid.framework.domain.User;

public interface LoginService {

    String login(String username, String password, String code, String uuid);

    String appLogin(String username);

}
