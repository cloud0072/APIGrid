package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cloud0072.apigrid.framework.domain.UnitUser;
import com.cloud0072.apigrid.framework.vo.UnitTeamUserVo;
import com.cloud0072.apigrid.framework.vo.UnitRoleUserVo;
import com.cloud0072.apigrid.framework.vo.UnitUserVo;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UnitUserMapper extends BaseMapper<UnitUser> {

    UnitUser selectUserByUsername(@Param("username") String username);

    UnitUser selectUserByMobile(@Param("mobile") String mobile);

    Page<UnitTeamUserVo> pageTeamUserByRootTeamId(Page<UnitTeamUserVo> page, String isDeleted);

    Page<UnitTeamUserVo> pageTeamUserByTeamIds(Page<UnitTeamUserVo> page, List<Long> teamIds, String isDeleted);

    UnitTeamUserVo getTeamUserById(String id);

    List<UnitRoleUserVo> getRoleUserByIds(List<Long> ids);

    List<UnitUserVo> selectUserByIds(List<Long> ids);
}
