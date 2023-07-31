package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.common.domain.LoginUser;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.mapper.UserMapper;
import com.cloud0072.apigrid.framework.service.UserService;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Date;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService, UserDetailsService {

    @Value("${apigrid.defaultPwd:123456}")
    private String defaultPwd;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public User registerUser(User user) {
        checkUser(user);
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreateTime(new Date());
        user.setUpdateTime(new Date());
        baseMapper.insert(user);
        return user;
    }

    @Override
    public void resetPassword(MemberUserVo vo) {
        if (StringUtils.isEmpty(vo.getNewPwd())) {
            throw new ServiceException("请输入新密码");
        }
        var user = baseMapper.selectById(vo.getUserId());
        if (user == null) {
            return;
        }
        if (!passwordEncoder.matches(vo.getPassword(), user.getPassword())) {
            throw new ServiceException("原密码错误");
        }
        user.setPassword(passwordEncoder.encode(vo.getNewPwd()));
        baseMapper.updateById(user);
    }

    private void checkUser(User user) {
        String name = user.getUsername();
        String mobile = user.getMobile();
        String pwd = user.getPassword();
        if (StringUtils.isNotEmpty(user.getUsername())) {
            if (name.length() < 4 || name.length() >= 32) {
                throw new ServiceException("用户名长度必须在4-32之间");
            }
            User user1 = baseMapper.selectUserByUsername(name);
            if (StringUtils.isNotNull(user1)) {
                throw new ServiceException("该用户名已被注册");
            }
        }
        if (StringUtils.isEmpty(pwd)) {
            user.setPassword(defaultPwd);
//            if (pwd.length() < 4 || pwd.length() >= 32) {
//                throw new ServiceException("密码长度必须在4-32之间");
//            }
        }
        if (StringUtils.isNotEmpty(mobile)) {
            User user1 = baseMapper.selectUserByMobile(mobile);
            if (StringUtils.isNotNull(user1)) {
                throw new ServiceException("该手机号已被注册");
            }
        }
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        User user = baseMapper.selectUserByUsername(username);
        if (StringUtils.isNull(user)) {
            throw new ServiceException("登录用户：" + username + " 不存在");
        }
        LoginUser loginUser = new LoginUser(user);
        if (!loginUser.isAccountNonLocked()) {
            throw new ServiceException("登录用户：" + username + " 该账号已被锁定");
        } else if (!loginUser.isEnabled()) {
            throw new ServiceException("登录用户：" + username + " 该账号已被禁用");
        }
        return loginUser;
    }
}
