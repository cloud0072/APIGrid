package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cloud0072.apigrid.framework.domain.UnitTeam;
import com.cloud0072.apigrid.framework.vo.UnitRoleUserVo;
import com.cloud0072.apigrid.framework.vo.UnitTeamVo;

import java.util.List;

public interface UnitTeamMapper extends BaseMapper<UnitTeam> {

    List<Long> selectTeamIdByParentIdIn(List<Long> parentIds);

    List<UnitRoleUserVo> getRoleTeamByIds(List<Long> refIds);

    List<Long> selectTeamIdsByParentId(Long teamId);

    List<UnitTeamVo> selectUnitTeamVoByTeamIds(List<Long> teamIds);

}
