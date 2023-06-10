package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.vo.UserVo;

public interface UserService extends IService<User> {

    User registerUser(User user);

    void resetPassword(UserVo user);
}
