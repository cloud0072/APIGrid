package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitRole;
import com.cloud0072.apigrid.framework.domain.UnitRoleUser;
import com.cloud0072.apigrid.framework.service.UnitRoleUserService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/unitRole")
@RestController
public class UnitRoleController extends BaseController<UnitRole> {

    @Autowired
    private UnitRoleUserService unitRoleUserService;

    /**
     * @param request
     * @param roleId
     * @return
     */
    @GetMapping("/{roleId}/members")
    public AjaxResult pageRoleUser(@PathVariable("roleId") Long roleId, HttpServletRequest request) {
        var page = getPageInfo(request, UnitRoleUser.class);
        var roleMemberPage = unitRoleUserService.pageRoleUser(page, roleId);
        return AjaxResult.success(roleMemberPage);
    }

    @PostMapping("/{roleId}/members")
    public AjaxResult insertRoleUser(@PathVariable("roleId") Long roleId, @RequestBody List<UnitRoleUser> roleMemberList) {
        var result = AjaxResult.success();
        var ids = unitRoleUserService.insertRoleUser(roleId, roleMemberList);
        result.put("ids", ids);
        return result;
    }

    @DeleteMapping("/{roleId}/members")
    public AjaxResult removeRoleUser(@PathVariable("roleId") Long roleId, @RequestBody List<Long> unitIds) {
        var result = AjaxResult.success();
        if (unitIds.size() > 0) {
            var count = unitRoleUserService.removeRoleUser(roleId, unitIds);
            result.put("count", count);
        }
        return result;
    }

    @PostMapping
    public AjaxResult insertEntity(@RequestBody UnitRole t) {
        if (t.getIsDeleted() == null) {
            t.setIsDeleted(0);
        }
        if (t.getSortNum() == null) {
            t.setSortNum(System.currentTimeMillis());
        }
        baseService.save(t);
        return AjaxResult.success(t);
    }

}
