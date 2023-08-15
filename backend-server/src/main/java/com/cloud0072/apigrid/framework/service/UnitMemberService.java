package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import com.cloud0072.apigrid.framework.vo.UnitMemberVo;

import java.util.List;

public interface UnitMemberService extends IService<UnitMember> {

    AjaxResult insertMemberUser(MemberUserVo vo);

    AjaxResult updateMemberUser(MemberUserVo vo);

    AjaxResult updateUserAvatar(MemberUserVo vo);

    MemberUserVo getMemberUserById(String id);

    Page<MemberUserVo> pageMemberUserByRootTeamId(Page<MemberUserVo> page, String isDeleted);

    Page<MemberUserVo> pageMemberUserByTeamIds(Page<MemberUserVo> page, List<Long> teamIds, String isDeleted);

    List<UnitMemberVo> listByTeamId(Long teamId);

    List<UnitMemberVo> findUnitMemberVo(List<Long> memberIds);
}
