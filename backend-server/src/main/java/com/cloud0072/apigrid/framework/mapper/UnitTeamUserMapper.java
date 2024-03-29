package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cloud0072.apigrid.framework.domain.UnitTeamUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface UnitTeamUserMapper extends BaseMapper<UnitTeamUser> {

    int countByRootId();

    int countByTeamId(List<Long> teamIds);

    List<Long> selectUserIdsByTeamId(@Param("teamId") Long teamId);
}
