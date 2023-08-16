package com.cloud0072.apigrid;

import com.cloud0072.apigrid.framework.service.UnitUserService;
import lombok.var;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@SpringBootTest
class BackendServerApplicationTests {

//    @Autowired
//    private UserMapper userMapper;

    @Autowired
    private UnitUserService unitUserService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testAddMember() {
//        MemberUserVo memberUserVo = MemberUserVo.builder()
//                .username("admin")
//                .password("admin")
//                .mobile("18638731263")
//                .email("352419394@qq.com")
//                .isLocked(0)
//                .isDeleted(0)
//                .createTime(new Date())
//                .updateTime(new Date())
//                .build();
//        unitMemberService.registerUnitUser(memberUserVo);
    }

    @Test
    public void testPageUser() {
//        QueryWrapper<User> wrapper = new QueryWrapper<>();
//        wrapper.select("user_id", "username").like("username", "01");
//        Page<User> page = userMapper.selectPage(new Page<>(1, 10), wrapper);
//        System.out.println(JSONUtils.toJSONString(page));
    }

    public static void main(String[] args) {
        var encoder = new BCryptPasswordEncoder();
        // $2a$10$qtpdn0XLBUh0sTMI0YEosOav/JODRTtJv.m.gLEmUXE666rGl6/z6
        System.out.println(encoder.encode("123456"));
    }

}
