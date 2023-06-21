package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.framework.domain.UnitTeam;

import java.util.List;

public interface UnitTeamService extends IService<UnitTeam> {

    List<Long> getAllTeamIdsInTeamTree(Long teamId);

    List<Long> getAllTeamIdsInTeamTree(List<Long> teamIds);

    List<TreeNode> getUnitTeamTree(QueryWrapper<UnitTeam> wrapper);

}
