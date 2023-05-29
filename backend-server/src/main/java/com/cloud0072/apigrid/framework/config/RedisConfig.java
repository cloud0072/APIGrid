package com.cloud0072.apigrid.framework.config;

import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.data.redis.connection.RedisConnectionFactory;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.serializer.RedisSerializer;

@Configuration
public class RedisConfig extends CachingConfigurerSupport {

    @Primary
    @Bean
    public RedisSerializer<Object> serializer() {
        return new FastJson2JsonRedisSerializer<>(Object.class);
    }

    @Primary
    @Bean("redisTemplate")
    public RedisTemplate<Object, Object> template(RedisConnectionFactory factory, RedisSerializer<Object> serializer) {
        RedisTemplate<Object, Object> template = new RedisTemplate<>();
        template.setConnectionFactory(factory);

        template.setKeySerializer(serializer);
        template.setValueSerializer(serializer);
        template.setHashKeySerializer(serializer);
        template.setHashValueSerializer(serializer);
        template.afterPropertiesSet();

        return template;
    }
}
