package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cloud0072.apigrid.framework.domain.UnitTeam;

import java.util.List;

public interface UnitTeamMapper extends BaseMapper<UnitTeam> {

    List<Long> selectTeamIdByParentIdIn(List<Long> parentIds);

}
