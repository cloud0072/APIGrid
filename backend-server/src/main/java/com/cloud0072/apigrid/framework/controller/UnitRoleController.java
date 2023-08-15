package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitRole;
import com.cloud0072.apigrid.framework.domain.UnitRoleMember;
import com.cloud0072.apigrid.framework.service.UnitRoleMemberService;
import com.cloud0072.apigrid.framework.service.UnitRoleService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

@RequestMapping("/unitRole")
@RestController
public class UnitRoleController extends BaseController<UnitRole> {

    @Autowired
    private UnitRoleService unitRoleService;

    @Autowired
    private UnitRoleMemberService unitRoleMemberService;


    /**
     * @param request
     * @param roleId
     * @return
     */
    @GetMapping("/{roleId}/members")
    public AjaxResult pageRoleMember(@PathVariable("roleId") Long roleId, HttpServletRequest request) {
        var page = getPageInfo(request, UnitRoleMember.class);
        var roleMemberPage = unitRoleMemberService.pageRoleMember(page, roleId);
        return AjaxResult.success(roleMemberPage);
    }

    @PostMapping("/{roleId}/members")
    public AjaxResult insertRoleMember(@PathVariable("roleId") Long roleId, @RequestBody List<UnitRoleMember> roleMemberList) {
        var result = AjaxResult.success();
        var ids = unitRoleMemberService.insertRoleMember(roleId, roleMemberList);
        result.put("ids", ids);
        return result;
    }

    @DeleteMapping("/{roleId}/members")
    public AjaxResult removeRoleMember(@PathVariable("roleId") Long roleId, @RequestBody List<Long> unitIds) {
        var result = AjaxResult.success();
        if (unitIds.size() > 0) {
            var count = unitRoleMemberService.removeRoleMember(roleId, unitIds);
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
