package com.cloud0072.apigrid.framework.service.impl;

import com.cloud0072.apigrid.common.domain.LoginUser;
import com.cloud0072.apigrid.common.exception.BackendException;
import com.cloud0072.apigrid.framework.security.context.AuthenticationContextHolder;
import com.cloud0072.apigrid.framework.service.LoginService;
import com.cloud0072.apigrid.framework.service.TokenService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.stereotype.Component;

/**
 * 登录校验方法
 *
 * @author ruoyi
 */
@Component
@Slf4j
public class LoginServiceImpl implements LoginService {

    @Autowired
    private TokenService tokenService;

    @Autowired
    private AuthenticationManager authenticationManager;

//    @Autowired
//    private UserDetailsService userDetailsService;

    /**
     * 登录验证
     *
     * @param username 用户名
     * @param password 密码
     * @param code     验证码
     * @param uuid     唯一标识
     * @return 结果
     */
    @Override
    public String login(String username, String password, String code, String uuid) {
        // 用户验证
        Authentication authentication = null;
        try {
            UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(username, password);
            AuthenticationContextHolder.setContext(authenticationToken);
            // 该方法会去调用UserDetailsServiceImpl.loadUserByUsername
            authentication = authenticationManager.authenticate(authenticationToken);
        } catch (AuthenticationException e) {
            throw new BackendException("用户名或密码错误");
        } finally {
            AuthenticationContextHolder.clearContext();
        }
        LoginUser user = (LoginUser) authentication.getPrincipal();
        // 生成token
        return tokenService.createToken(user);
    }

//    /**
//     * 统一登陆流程
//     *
//     * @param username
//     * @return
//     */
//    @Override
//    public String appLogin(String username) {
//        UserDetails user = userDetailsService.loadUserByUsername(username);
//        // 保存user登陆凭证到 spring security
//        UsernamePasswordAuthenticationToken authenticationToken = new UsernamePasswordAuthenticationToken(user, null, user.getAuthorities());
//        HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
//        authenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//        SecurityContextHolder.getContext().setAuthentication(authenticationToken);
//        // 生成令牌
//        return tokenService.createToken((LoginUser) user);
//    }

}
