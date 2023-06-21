package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.framework.domain.UnitTeam;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/unitTeam")
@RestController
public class UnitTeamController extends BaseController<UnitTeam> {

    @Autowired
    private UnitTeamService unitTeamService;

    @GetMapping("/spaceTeamTree")
    public AjaxResult getUnitTeamTree() {
//        SecurityUtils.getUser().getMemberList();
        QueryWrapper<UnitTeam> wrapper = new QueryWrapper<>();
        wrapper.eq("isDeleted", 0);
        List<TreeNode> teamTree = unitTeamService.getUnitTeamTree(wrapper);
        return AjaxResult.success(teamTree);
    }

    @PostMapping
    public AjaxResult insertEntity(@RequestBody UnitTeam t) {
        if (t.getIsDeleted() == null) {
            t.setIsDeleted(0);
        }
        if (t.getSortNum() == null) {
            t.setSortNum(0L);
        }
        baseService.save(t);
        return AjaxResult.success(t);
    }

}
