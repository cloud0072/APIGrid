package com.cloud0072.apigrid.framework.service;

public interface LoginService {

    String login(String username, String password, String code, String uuid);

    String appLogin(String username);

}
