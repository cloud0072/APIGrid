package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitUser;
import com.cloud0072.apigrid.framework.vo.UnitTeamUserVo;
import com.cloud0072.apigrid.framework.vo.UnitUserVo;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.List;

public interface UnitUserService extends IService<UnitUser> {

    AjaxResult registerUnitUser(UnitTeamUserVo vo);

    AjaxResult updateUnitUser(UnitTeamUserVo vo);

    AjaxResult deleteUnitUser(Long userId);

    AjaxResult updateUserAvatar(UnitTeamUserVo vo);

    void resetPassword(UnitTeamUserVo vo);

    UnitTeamUserVo getTeamUserById(String id);

    Page<UnitTeamUserVo> pageTeamUserByRootTeamId(Page<UnitTeamUserVo> page, String isDeleted);

    Page<UnitTeamUserVo> pageTeamUserByTeamIds(Page<UnitTeamUserVo> page, List<Long> teamIds, String isDeleted);

    List<UnitUserVo> listByTeamId(Long teamId);

    List<UnitUserVo> findUnitUserVo(List<Long> userIds);

}
