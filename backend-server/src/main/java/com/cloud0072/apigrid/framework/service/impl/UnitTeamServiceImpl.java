package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.framework.domain.UnitTeam;
import com.cloud0072.apigrid.framework.mapper.UnitTeamMapper;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UnitTeamServiceImpl extends ServiceImpl<UnitTeamMapper, UnitTeam> implements UnitTeamService {

    @Autowired
    private UnitTeamMapper unitTeamMapper;

    @Override
    public List<Long> getAllTeamIdsInTeamTree(Long teamId) {
        return this.getAllTeamIdsInTeamTree(Collections.singletonList(teamId));
    }

    @Override
    public List<Long> getAllTeamIdsInTeamTree(List<Long> teamIds) {
        Set<Long> teamIdSet = new LinkedHashSet<>(teamIds);
        List<Long> parentIds = new ArrayList<>(teamIds);
        while (!parentIds.isEmpty()) {
            List<Long> subTeamIds = unitTeamMapper.selectTeamIdByParentIdIn(parentIds);
            if (subTeamIds.isEmpty()) {
                break;
            }
            parentIds = subTeamIds.stream()
                    .filter(i -> !teamIdSet.contains(i))
                    .collect(Collectors.toList());
            teamIdSet.addAll(subTeamIds);
        }
        return new ArrayList<>(teamIdSet);
    }

    @Override
    public List<TreeNode> getUnitTeamTree(QueryWrapper<UnitTeam> wrapper) {
        List<UnitTeam> teamList = unitTeamMapper.selectList(wrapper);
        return buildTree(teamList, 0L);
    }

    private List<TreeNode> buildTree(List<UnitTeam> teamList, Serializable parentId) {
        return teamList.stream()
                .filter(t -> Objects.equals(t.getParentId(), parentId))
                .map(t -> {
                    List<TreeNode> children = buildTree(teamList, t.getId());
                    return TreeNode.builder()
                            .key(t.getId().toString())
                            .title(t.getTeamName())
                            .isLeaf(children.isEmpty())
                            .children(children)
                            .build();
                }).collect(Collectors.toList());
    }

}
