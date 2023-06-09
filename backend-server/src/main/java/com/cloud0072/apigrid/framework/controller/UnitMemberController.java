package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.service.UnitMemberService;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/unitMember")
@RestController
public class UnitMemberController extends BaseController<UnitMember> {

    @Autowired
    private UnitMemberService unitMemberService;

    @Autowired
    private UnitTeamService unitTeamService;

    @GetMapping("/page")
    public AjaxResult selectEntityPage(UnitMember t, HttpServletRequest request) {
        String pageSize = request.getParameter("pageSize");
        String pageNum = request.getParameter("pageNum");
        long size = StringUtils.isEmpty(pageSize) ? 20 : Long.parseLong(pageSize);
        long num = StringUtils.isEmpty(pageNum) ? 1 : Long.parseLong(pageNum);
        Page<MemberUserVo> page = new Page<>(num, size);

        var isDeleted = request.getParameter("isDeleted");
        var teamId = request.getParameter("teamId");
        if (teamId == null || "0".equals(teamId)) {
            var pageMemberUserVo = unitMemberService.pageMemberUserByRootTeamId(page, isDeleted);
            return AjaxResult.success(pageMemberUserVo);
        } else {
            List<Long> teamIds = unitTeamService.getAllTeamIdsInTeamTree(Long.valueOf(teamId));
            var pageMemberUserVo = unitMemberService.pageMemberUserByTeamIds(page, teamIds, isDeleted);
            return AjaxResult.success(pageMemberUserVo);
        }
    }

//    @Override
//    protected AjaxResult selectEntityPage(UnitMember unitMember, HttpServletRequest request) {
//        return super.selectEntityPage(unitMember, request);
//    }

    @PostMapping("addMember")
    public AjaxResult addMember(MemberUserVo vo) {
        return unitMemberService.addMember(vo);
    }

    @PostMapping("inviteMember")
    public AjaxResult inviteMember(MemberUserVo vo) {
        // spaceId 还未开发
        return AjaxResult.success();
    }
}
