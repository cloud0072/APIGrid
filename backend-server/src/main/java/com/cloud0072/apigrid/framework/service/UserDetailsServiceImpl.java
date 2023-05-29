package com.cloud0072.apigrid.framework.service;

import com.cloud0072.apigrid.framework.domain.LoginUser;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.StringUtils;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashSet;

/**
 * 用户验证处理
 *
 * @author ruoyi
 */
@Slf4j
@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        LoginUser user = new LoginUser("admin", passwordEncoder.encode("admin"), new HashSet<>());
        if (StringUtils.isNull(user)) {
            log.info("登录用户：{} 不存在.", username);
            throw new ServiceException("登录用户：" + username + " 不存在");
        }
        return user;
    }

}
