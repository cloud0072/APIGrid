package com.cloud0072.apigrid.framework.security.filter;

import cn.hutool.core.codec.Base64;
import com.alibaba.fastjson2.JSONObject;
import com.cloud0072.apigrid.common.constant.Constants;
import com.cloud0072.apigrid.common.domain.LoginUser;
import com.cloud0072.apigrid.common.util.SpringUtils;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.service.TokenService;
import lombok.extern.slf4j.Slf4j;

import javax.servlet.*;
import javax.servlet.http.HttpServletRequest;
import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Arrays;

/**
 * basic认证过滤器
 *
 * @author caolei
 */
@Slf4j
public class BasicAuthenticationFilter implements Filter {

    private TokenService tokenService;

    private String basicToken;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {
        if (tokenService == null) {
            tokenService = SpringUtils.getBean(TokenService.class);
        }
        basicToken = filterConfig.getInitParameter("basicToken");
    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse response, FilterChain chain) throws IOException, ServletException {
        HttpServletRequest request = (HttpServletRequest) servletRequest;
        String auth = request.getHeader(Constants.HEADER_AUTH);
        if (!StringUtils.isEmpty(auth) && auth.contains(Constants.BASIC_PREFIX)) {
            String base64 = auth.replace(Constants.BASIC_PREFIX, "");
//            ISysConfigService sysConfigService = SpringUtils.getBean(ISysConfigService.class);
//            String basicToken = sysConfigService.selectConfigByKey("sys.auth.basic");
            if (Arrays.asList(basicToken.split(",")).contains(base64)) {
                String principal = new String(Base64.decode(base64), StandardCharsets.UTF_8);
                log.info("request: {}, principal:{}", request.getRequestURL().toString(), principal);
                chain.doFilter(request, response);
                return;
            }
        } else if (!StringUtils.isEmpty(auth) && auth.contains(Constants.TOKEN_PREFIX)) {
            try {
                LoginUser user = tokenService.getUser(request);
                if (StringUtils.isNotNull(user)) {
                    tokenService.verifyToken(user);
                    chain.doFilter(request, response);
                    return;
                }
            } catch (Exception ignored) {
            }
        }

        JSONObject result = new JSONObject();
        result.put("code", 401);
        result.put("msg", "认证失败");
        response.setContentType("application/json");
        response.setCharacterEncoding("utf-8");
        response.getWriter().print(result.toJSONString());

    }

}
