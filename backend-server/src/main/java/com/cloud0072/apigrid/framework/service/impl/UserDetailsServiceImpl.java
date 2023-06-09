package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.mapper.UserMapper;
import com.cloud0072.apigrid.framework.service.BaseService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

/**
 * 用户验证处理
 *
 * @author ruoyi
 */
@Slf4j
@Service
public class UserDetailsServiceImpl implements BaseService<User, Long>, UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserMapper userMapper;

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = userMapper.selectUserByUsername(username);
        if (StringUtils.isNull(user)) {
            throw new ServiceException("登录用户：" + username + " 不存在");
        } else if (!user.isAccountNonLocked()) {
            throw new ServiceException("登录用户：" + username + " 该账号已被锁定");
        } else if (!user.isEnabled()) {
            throw new ServiceException("登录用户：" + username + " 该账号已被禁用");
        }
        return user;
    }

    public User insertUser(User user) {
        checkUser(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userMapper.insert(user);
        return user;
    }

    private void checkUser(User user) {
        String name = user.getUsername();
        String mobile = user.getMobile();
        String pwd = user.getPassword();
        if (StringUtils.isNotEmpty(user.getUsername())) {
            if (name.length() < 4 || name.length() >= 32) {
                throw new ServiceException("用户名长度必须在4-32之间");
            }
            User user1 = userMapper.selectUserByUsername(name);
            if (StringUtils.isNull(user1)) {
                throw new ServiceException("该用户名已被注册");
            }
        }
        if (StringUtils.isNotEmpty(pwd)) {
            if (pwd.length() < 4 || pwd.length() >= 32) {
                throw new ServiceException("密码长度必须在4-32之间");
            }
        }
        if (StringUtils.isNotEmpty(mobile)) {
            User user1 = userMapper.selectUserByMobile(mobile);
            if (StringUtils.isNull(user1)) {
                throw new ServiceException("该手机号已被注册");
            }
        }
    }

    @Override
    public BaseMapper<User> getMapper() {
        return userMapper;
    }
}
