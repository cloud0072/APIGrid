package com.cloud0072.apigrid.framework.config;

import cn.hutool.core.util.StrUtil;
import com.baomidou.mybatisplus.annotation.FieldStrategy;
import com.baomidou.mybatisplus.autoconfigure.ConfigurationCustomizer;
import com.baomidou.mybatisplus.autoconfigure.MybatisPlusPropertiesCustomizer;
import com.baomidou.mybatisplus.core.injector.AbstractMethod;
import com.baomidou.mybatisplus.core.injector.DefaultSqlInjector;
import com.baomidou.mybatisplus.core.metadata.TableInfo;
import com.baomidou.mybatisplus.extension.MybatisMapWrapperFactory;
import com.baomidou.mybatisplus.extension.injector.methods.InsertBatchSomeColumn;
import com.baomidou.mybatisplus.extension.plugins.MybatisPlusInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.OptimisticLockerInnerInterceptor;
import com.baomidou.mybatisplus.extension.plugins.inner.PaginationInnerInterceptor;
import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import java.util.List;
import java.util.Properties;

/**
 * Mybatis-plus Config
 */
@Configuration(proxyBeanMethods = false)
@EnableTransactionManagement
@MapperScan(basePackages = {"com.cloud0072.apigrid.framework.mapper"})
@Slf4j
public class MybatisPlusConfig {

    @Value("${DATABASE_TABLE_PREFIX:apigrid_}")
    private String tablePrefix;

    @Bean
    public MybatisPlusInterceptor mybatisPlusInterceptor() {
        MybatisPlusInterceptor interceptor = new MybatisPlusInterceptor();
        interceptor.addInnerInterceptor(new PaginationInnerInterceptor());
        interceptor.addInnerInterceptor(new OptimisticLockerInnerInterceptor());
        return interceptor;
    }

    @Bean
    public ConfigurationCustomizer configurationCustomizer() {
        return configuration -> {
            configuration.setObjectWrapperFactory(new MybatisMapWrapperFactory());
            configuration.setCacheEnabled(false);
        };
    }

    @Bean
    public MybatisPlusPropertiesCustomizer mybatisPlusPropertiesCustomizer() {
        return properties -> {
            properties.getGlobalConfig().setBanner(false);
            properties.getGlobalConfig().getDbConfig().setTablePrefix(tablePrefix);
            Properties customProperties = new Properties();
            customProperties.setProperty("tablePrefix", tablePrefix);
            properties.setConfigurationProperties(customProperties);
            properties.setCheckConfigLocation(true);
            properties.getGlobalConfig().getDbConfig().setUpdateStrategy(FieldStrategy.NOT_EMPTY);
            properties.setMapperLocations(new String[]{"classpath*:/mapper/*.xml"});
        };
    }

    @Bean
    public DefaultSqlInjector expandSqlInjector() {
        // Support batch insertion
        return new DefaultSqlInjector() {
            @Override
            public List<AbstractMethod> getMethodList(Class<?> mapperClass, TableInfo tableInfo) {
                List<AbstractMethod> methodList = super.getMethodList(mapperClass, tableInfo);
                InsertBatchSomeColumn insertBatchSomeColumn = new InsertBatchSomeColumn(t ->
                        !StrUtil.equalsAny(t.getProperty(), "createdTime", "updatedTime", "isDeleted"));
                methodList.add(insertBatchSomeColumn);
                return methodList;
            }
        };
    }
}

