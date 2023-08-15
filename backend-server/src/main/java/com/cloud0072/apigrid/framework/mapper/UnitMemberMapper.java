package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import com.cloud0072.apigrid.framework.vo.RoleMemberVo;
import com.cloud0072.apigrid.framework.vo.UnitMemberVo;

import java.util.Collection;
import java.util.List;

public interface UnitMemberMapper extends BaseMapper<UnitMember> {

    Page<MemberUserVo> pageMemberUserByRootTeamId(Page<MemberUserVo> page, String isDeleted);

    Page<MemberUserVo> pageMemberUserByTeamIds(Page<MemberUserVo> page, List<Long> teamIds, String isDeleted);

    MemberUserVo getMemberUserById(String id);

    List<RoleMemberVo> getRoleMemberByIds(List<Long> ids);

    List<UnitMemberVo> selectUnitMemberByMemberIds(List<Long> ids);
}
