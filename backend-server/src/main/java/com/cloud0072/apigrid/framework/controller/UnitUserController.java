package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.UnitUser;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import com.cloud0072.apigrid.framework.service.UnitUserService;
import com.cloud0072.apigrid.framework.vo.UnitTeamUserVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/unitUser")
@RestController
public class UnitUserController extends BaseController<UnitUser> {

    @Autowired
    private UnitUserService unitUserService;

    @Autowired
    private UnitTeamService unitTeamService;

    @GetMapping("/page")
    public AjaxResult selectEntityPage(UnitUser t, HttpServletRequest request) {
        Page<UnitTeamUserVo> page = getPageInfo(request, UnitTeamUserVo.class);

        var isDeleted = request.getParameter("isDeleted");
        isDeleted = StringUtils.isEmpty(isDeleted) ? "0" : isDeleted;
        var teamId = request.getParameter("teamId");
        if (teamId == null || "0".equals(teamId)) {
            var pageMemberUserVo = unitUserService.pageTeamUserByRootTeamId(page, isDeleted);
            return AjaxResult.success(pageMemberUserVo);
        } else {
            List<Long> teamIds = unitTeamService.getAllTeamIdsInTeamTree(Long.valueOf(teamId));
            var pageMemberUserVo = unitUserService.pageTeamUserByTeamIds(page, teamIds, isDeleted);
            return AjaxResult.success(pageMemberUserVo);
        }
    }

//    @Override
//    protected AjaxResult selectEntityPage(UnitMember unitMember, HttpServletRequest request) {
//        return super.selectEntityPage(unitMember, request);
//    }

    @PostMapping("/registerUnitUser")
    public AjaxResult registerUnitUser(@RequestBody UnitTeamUserVo vo) {
        return unitUserService.registerUnitUser(vo);
    }

    @PostMapping("/updateUnitUser")
    public AjaxResult updateUnitUser(@RequestBody UnitTeamUserVo vo) {
        return unitUserService.updateUnitUser(vo);
    }

    @DeleteMapping("/deleteUnitUser/{userId}")
    public AjaxResult deleteUnitUser(@PathVariable("userId") Long userId) {
        return unitUserService.deleteUnitUser(userId);
    }

    @GetMapping("/getTeamUserById/{id}")
    public AjaxResult getTeamUserById(@PathVariable("id") String id) {
        var memberUserVo = unitUserService.getTeamUserById(id);
        return AjaxResult.success(memberUserVo);
    }

}
