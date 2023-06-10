package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.framework.domain.User;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;


@RequestMapping("/user")
@RestController
public class UserController extends BaseController<User> {


}
