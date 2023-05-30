package com.cloud0072.apigrid.framework.security;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.JSONUtils;
import com.cloud0072.apigrid.common.util.ServletUtils;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.service.TokenService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.logout.LogoutSuccessHandler;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * 自定义退出处理类 返回成功
 *
 * @author ruoyi
 */
@Configuration
public class LogoutSuccessHandlerImpl implements LogoutSuccessHandler {
    @Autowired
    private TokenService tokenService;

    /**
     * 退出处理
     *
     * @return
     */
    @Override
    public void onLogoutSuccess(HttpServletRequest request, HttpServletResponse response, Authentication authentication) {
        User user = tokenService.getUser(request);
        if (StringUtils.isNotNull(user)) {
            // 删除用户缓存记录
            tokenService.delUser(user.getToken());
            // 记录用户退出日志
//            String userName = loginUser.getUsername();
//            AsyncManager.me().execute(AsyncFactory.recordLogininfor(userName, Constants.LOGOUT, "退出成功"));
        }
        ServletUtils.renderString(response, JSONUtils.toJSONString(AjaxResult.success("退出成功")));
    }
}
