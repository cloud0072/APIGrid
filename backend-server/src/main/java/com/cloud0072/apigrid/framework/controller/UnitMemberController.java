package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.service.UnitMemberService;
import com.cloud0072.apigrid.framework.vo.UserVo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/unitMember")
@RestController
public class UnitMemberController extends BaseController<UnitMember> {

    @Autowired
    private UnitMemberService unitMemberService;

    @PostMapping("addMember")
    public AjaxResult addMember(UserVo vo) {
        return unitMemberService.addMember(vo);
    }

    @PostMapping("inviteMember")
    public AjaxResult inviteMember(UserVo vo) {
        // spaceId 还未开发
        return AjaxResult.success();
    }
}
