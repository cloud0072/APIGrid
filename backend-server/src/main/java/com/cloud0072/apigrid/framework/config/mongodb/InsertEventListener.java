package com.cloud0072.apigrid.framework.config.mongodb;

import com.cloud0072.apigrid.common.annotation.AutoId;
import com.cloud0072.apigrid.common.util.IdUtils;
import org.springframework.data.mongodb.core.mapping.event.AbstractMongoEventListener;
import org.springframework.data.mongodb.core.mapping.event.BeforeConvertEvent;
import org.springframework.stereotype.Component;
import org.springframework.util.ReflectionUtils;

@Component
public class InsertEventListener extends AbstractMongoEventListener<Object> {

    @Override
    public void onBeforeConvert(BeforeConvertEvent<Object> event) {
        Object source = event.getSource();
        ReflectionUtils.doWithFields(source.getClass(), field -> {
            ReflectionUtils.makeAccessible(field);
            // 字段满足：添加了AutoIncKey注解；字段的值为空
            if (field.isAnnotationPresent(AutoId.class) && field.get(source) == null) {
                AutoId autoId = field.getAnnotation(AutoId.class);
                if (autoId.value() == AutoId.IdType.SNOWFLAKE && field.getType().equals(Long.class)) {
                    field.set(source, IdUtils.snowflakeId().toString());
                } else if (autoId.value() == AutoId.IdType.UUID && field.getType().equals(String.class)) {
                    field.set(source, IdUtils.fastUUID());
                }
            }
        });
    }

}
