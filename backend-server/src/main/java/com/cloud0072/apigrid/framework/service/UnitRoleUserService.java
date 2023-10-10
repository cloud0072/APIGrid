package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.framework.domain.UnitRoleUser;
import com.cloud0072.apigrid.framework.vo.UnitRoleUserVo;

import java.util.List;

public interface UnitRoleUserService extends IService<UnitRoleUser> {

    IPage<UnitRoleUserVo> pageRoleUser(Page<UnitRoleUser> page, Long roleId);

    List<Long> insertRoleUser(Long roleId, List<UnitRoleUser> roleUserList);

    int removeRoleUser(Long roleId, List<Long> unitIds);
}
