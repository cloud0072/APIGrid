package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.framework.domain.UnitTeam;
import com.cloud0072.apigrid.framework.service.UnitUserService;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import com.cloud0072.apigrid.framework.vo.UnitUserVo;
import com.cloud0072.apigrid.framework.vo.UnitTeamVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/unitTeam")
@RestController
public class UnitTeamController extends BaseController<UnitTeam> {

    @Autowired
    private UnitTeamService unitTeamService;

    @Autowired
    private UnitUserService unitUserService;

    @GetMapping("/getTeamTree")
    public AjaxResult getTeamTree() {
        QueryWrapper<UnitTeam> wrapper = new QueryWrapper<>();
        wrapper.eq("is_deleted", 0);
        List<TreeNode> teamTree = unitTeamService.getTeamTree(wrapper);
        return AjaxResult.success(teamTree);
    }

    @GetMapping("/getSubUnitList")
    public AjaxResult getSubUnitList(Long teamId) {
        var result = AjaxResult.success();
        List<UnitTeamVo> teams = unitTeamService.listByTeamId(teamId);
        List<UnitUserVo> members = unitUserService.listByTeamId(teamId);
        result.put("teams", teams);
        result.put("members", members);
        return result;
    }

    @PostMapping
    public AjaxResult insertEntity(@RequestBody UnitTeam t) {
        return AjaxResult.success(unitTeamService.insertUnitTeam(t));
    }

}
