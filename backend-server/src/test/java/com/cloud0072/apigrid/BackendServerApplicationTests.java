package com.cloud0072.apigrid;

import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import com.cloud0072.apigrid.framework.domain.UnitRole;
import com.cloud0072.apigrid.framework.domain.UnitTeam;
import com.cloud0072.apigrid.framework.service.UnitRoleService;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import com.cloud0072.apigrid.framework.service.UnitUserService;
import com.cloud0072.apigrid.framework.vo.UnitTeamUserVo;
import lombok.var;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

import java.util.Date;

@SpringBootTest
class BackendServerApplicationTests {

    @Autowired
    private UnitUserService unitUserService;

    @Autowired
    private UnitTeamService unitTeamService;

    @Autowired
    private UnitRoleService unitRoleService;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Test
    public void testPassword() {
        var encoder = new BCryptPasswordEncoder();
        // $2a$10$xYCMDmP260KGErC1JsvcUOIbbjDsR3fE7Z3mLftka2EUgHDimc3f.
        System.out.println(encoder.encode("123456"));
        // $2a$10$zx5T61nfOxoBI9yIb6ag7OLBlQsdF8y25NE5/jeUrAlAEuLUFYobu
        System.out.println(encoder.encode("Bjh1517"));
    }

    @Test
    void testAddUser() {
        UnitTeamUserVo user = UnitTeamUserVo.builder()
                .userId(1L)
                .nickName("管理员")
                .username("admin")
                .password("123456")
                .mobile("18638731263")
                .email("352419394@qq.com")
                .isAdmin(1)
                .isLocked(0)
                .isDeleted(0)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        unitUserService.registerUnitUser(user);
    }

    @Test
    void testAddTeam() {
        UnitTeam team0 = UnitTeam.builder()
                .id(0L)
                .teamName("根节点")
                .parentId(-1L)
                .sortNum(0L)
                .isDeleted(0)
                .build();
        UnitTeam team1 = UnitTeam.builder()
                .teamName("销售部")
                .parentId(0L)
                .sortNum(0L)
                .isDeleted(0)
                .build();
        UnitTeam team2 = UnitTeam.builder()
                .teamName("技术部")
                .parentId(0L)
                .sortNum(1L)
                .isDeleted(0)
                .build();

        unitTeamService.insertUnitTeam(team0);
        unitTeamService.insertUnitTeam(team1);
        unitTeamService.insertUnitTeam(team2);

    }

    @Test
    void testAddRole() {
        UnitRole role1 = UnitRole.builder()
                .roleName("产品")
                .isDeleted(0)
                .build();
        UnitRole role2 = UnitRole.builder()
                .roleName("技术")
                .isDeleted(0)
                .build();
        unitRoleService.save(role1);
        unitRoleService.save(role2);
    }


}
