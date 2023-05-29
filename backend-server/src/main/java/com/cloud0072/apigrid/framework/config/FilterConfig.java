package com.cloud0072.apigrid.framework.config;

import com.cloud0072.apigrid.framework.security.filter.BasicAuthenticationFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.servlet.FilterRegistrationBean;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.HashMap;
import java.util.Map;

/**
 * Filter配置
 *
 * @author ruoyi
 */
@Configuration
public class FilterConfig {

    @Value("${auth.urlPatterns}")
    private String[] authUrlPatterns;

    @Value("${auth.basicToken}")
    private String basicToken;

    @Bean
    public FilterRegistrationBean basicAuthFilter() {
        FilterRegistrationBean filter = new FilterRegistrationBean();
        filter.setFilter(new BasicAuthenticationFilter());
        filter.setName("basicAuthFilter");
        if (authUrlPatterns != null && authUrlPatterns.length > 0) {
            filter.addUrlPatterns(authUrlPatterns);
        }
        Map<String, String> initParameters = new HashMap<>();
        initParameters.put("basicToken", basicToken);
        filter.setInitParameters(initParameters);
        return filter;
    }

}
