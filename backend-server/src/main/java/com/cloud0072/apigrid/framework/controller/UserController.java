package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.service.BaseService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/user")
@RestController
public class UserController extends BaseController<User, Long> {

    @Autowired
    private BaseService<User, Long> userService;

    @Override
    BaseService<User, Long> getService() {
        return userService;
    }

}
