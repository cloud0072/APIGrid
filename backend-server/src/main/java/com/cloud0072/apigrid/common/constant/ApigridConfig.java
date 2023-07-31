package com.cloud0072.apigrid.common.constant;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@ConfigurationProperties("apigrid-config")
@Configuration
@Data
public class ApigridConfig {

    public String defaultPassword;

}
