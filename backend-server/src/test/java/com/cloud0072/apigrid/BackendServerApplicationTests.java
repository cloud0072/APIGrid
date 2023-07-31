package com.cloud0072.apigrid;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cloud0072.apigrid.common.util.JSONUtils;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.mapper.UserMapper;
import com.cloud0072.apigrid.framework.service.UnitMemberService;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootTest
class BackendServerApplicationTests {

    @Autowired
    private UserMapper userMapper;

    @Autowired
    private UnitMemberService unitMemberService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    void testAddMember() {
        MemberUserVo memberUserVo = MemberUserVo.builder()
                .userId(1L)
                .username("admin")
                .password("admin")
                .mobile("18638731263")
                .email("352419394@qq.com")
                .nickName("管理员")
                .isLocked(0)
                .isDeleted(0)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        unitMemberService.insertMemberUser(memberUserVo);
    }

    @Test
    void testInsertUser() {
        User user = User.builder()
                .userId(1L)
                .username("admin")
                .password(passwordEncoder.encode("admin"))
                .mobile("18638731263")
                .email("352419394@qq.com")
                .nickName("管理员")
                .isLocked(0)
                .isDeleted(0)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        userMapper.insert(user);
    }

    @Test
    void testBatchInsertUser() {
//        List<User> users = new ArrayList<>();
        for (int i = 1; i <= 100; i++) {
            String key = i < 10 ? "00" + i : i < 100 ? "0" + i : "" + i;
            User user = User.builder()
                    .username("user" + key)
                    .password(passwordEncoder.encode("user" + key))
                    .mobile("18600000" + key)
                    .email("352419394@qq.com")
                    .isLocked(0)
                    .isDeleted(0)
                    .createTime(new Date())
                    .updateTime(new Date())
                    .build();
//            users.add(user);
            userMapper.insert(user);
        }
    }

    @Test
    public void testPageUser() {
        QueryWrapper<User> wrapper = new QueryWrapper<>();
        wrapper.select("user_id", "username").like("username", "01");
//        Page page = userMapper.selectMapsPage(new Page<>(1, 10), wrapper);
        Page<User> page = userMapper.selectPage(new Page<>(1, 10), wrapper);
        System.out.println(JSONUtils.toJSONString(page));
    }


}
