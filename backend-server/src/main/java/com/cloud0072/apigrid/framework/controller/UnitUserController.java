package com.cloud0072.apigrid.framework.controller;

import cn.hutool.json.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
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
import java.util.stream.Collectors;

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
            var pageUserUserVo = unitUserService.pageTeamUserByRootTeamId(page, isDeleted);
            return AjaxResult.success(pageUserUserVo);
        } else {
            List<Long> teamIds = unitTeamService.getAllTeamIdsInTeamTree(Long.valueOf(teamId));
            var pageUserUserVo = unitUserService.pageTeamUserByTeamIds(page, teamIds, isDeleted);
            return AjaxResult.success(pageUserUserVo);
        }
    }

//    @Override
//    protected AjaxResult selectEntityPage(UnitUser unitUser, HttpServletRequest request) {
//        return super.selectEntityPage(unitUser, request);
//    }

    @PostMapping("/registerUnitUser")
    public AjaxResult registerUnitUser(@RequestBody UnitTeamUserVo vo) {
        return unitUserService.registerUnitUser(vo);
    }

    @PutMapping("/updateUnitUser")
    public AjaxResult updateUnitUser(@RequestBody UnitTeamUserVo vo) {
        return unitUserService.updateUnitUser(vo);
    }

    @DeleteMapping("/deleteUnitUser/{userId}")
    public AjaxResult deleteUnitUser(@PathVariable("userId") Long userId) {
        return unitUserService.deleteUnitUser(userId);
    }

    @GetMapping("/getTeamUserById/{id}")
    public AjaxResult getTeamUserById(@PathVariable("id") String id) {
        var teamUserVo = unitUserService.getTeamUserById(id);
        return AjaxResult.success(teamUserVo);
    }

    @GetMapping("/options")
    public AjaxResult options(UnitUser t) {
        QueryWrapper<UnitUser> wrapper = new QueryWrapper<>(t);
        var users = unitUserService.list(wrapper);
        var result = users.stream().map(u -> new JSONObject()
                .set("id", u.getId().toString())
                .set("name", u.getNickName())
                .set("avatar", u.getAvatar())
                .set("avatarColor", u.getAvatarColor())
                .set("isDeleted", u.getIsDeleted())
        ).collect(Collectors.toList());
        return AjaxResult.success(result);
    }

}
