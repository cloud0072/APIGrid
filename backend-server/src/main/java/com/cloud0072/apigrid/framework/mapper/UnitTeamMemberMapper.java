package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cloud0072.apigrid.framework.domain.UnitTeamMember;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface UnitTeamMemberMapper extends BaseMapper<UnitTeamMember> {

    int countByRootId();

    int countByTeamId(List<Long> teamIds);

    List<Long> selectMemberIdsByTeamId(@Param("teamId") Long teamId);
}
