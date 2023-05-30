package com.cloud0072.apigrid;

import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.mapper.UserMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootTest
class BackendServerApplicationTests {

    @Autowired
    private UserMapper userMapper;

    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Test
    void contextLoads() {
    }

    @Test
    void testInsertUser() {
        User user = User.builder()
                .userId(1L)
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .mobile("18638731263")
                .email("352419394@qq.com")
                .isLocked(0)
                .isDeleted(0)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        userMapper.insert(user);
    }


}
