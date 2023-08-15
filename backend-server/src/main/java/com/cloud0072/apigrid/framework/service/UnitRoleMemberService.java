package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.framework.domain.UnitRoleMember;
import com.cloud0072.apigrid.framework.vo.RoleMemberVo;

import java.util.List;

public interface UnitRoleMemberService extends IService<UnitRoleMember> {

    IPage<RoleMemberVo> pageRoleMember(Page<UnitRoleMember> page, Long roleId);

    List<Long> insertRoleMember(Long roleId, List<UnitRoleMember> roleMemberList);

    int removeRoleMember(Long roleId, List<Long> unitIds);
}
