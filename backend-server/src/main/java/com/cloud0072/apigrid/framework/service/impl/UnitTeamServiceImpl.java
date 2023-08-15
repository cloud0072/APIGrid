package com.cloud0072.apigrid.framework.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.Unit;
import com.cloud0072.apigrid.framework.domain.UnitTeam;
import com.cloud0072.apigrid.framework.mapper.UnitMapper;
import com.cloud0072.apigrid.framework.mapper.UnitTeamMapper;
import com.cloud0072.apigrid.framework.mapper.UnitTeamUserMapper;
import com.cloud0072.apigrid.framework.service.UnitTeamService;
import com.cloud0072.apigrid.framework.vo.UnitTeamVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.io.Serializable;
import java.util.*;
import java.util.stream.Collectors;

@Service
public class UnitTeamServiceImpl extends ServiceImpl<UnitTeamMapper, UnitTeam> implements UnitTeamService {

    @Autowired
    private UnitTeamUserMapper unitTeamUserMapper;

    @Autowired
    private UnitMapper unitMapper;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public UnitTeam insertUnitTeam(UnitTeam unitTeam) {
        if (StringUtils.isEmpty(unitTeam.getTeamName()) || unitTeam.getParentId() == null) {
            throw new ServiceException("请求失败，请提供正确的上级小组和小组名");
        }
        var existList = baseMapper.selectList(new QueryWrapper<UnitTeam>()
                .eq("team_name", unitTeam.getTeamName())
                .eq("parent_id", unitTeam.getParentId()));
        if (existList.size() > 0) {
            throw new ServiceException("请求失败，本级小组下已存在该名称");
        }

        if (unitTeam.getSortNum() == null) {
            unitTeam.setSortNum(0L);
        }
        unitTeam.setIsDeleted(0)
                .setUpdateBy(SecurityUtils.getUserId())
                .setUpdateTime(new Date());
        baseMapper.insert(unitTeam);

        var unit = Unit.builder()
                .unitType(1)
                .unitRefId(unitTeam.getId())
                .isDeleted(0)
                .updateBy(SecurityUtils.getUserId())
                .updateTime(new Date())
                .build();
        unitMapper.insert(unit);

        return unitTeam;
    }

    @Override
    public List<Long> getAllTeamIdsInTeamTree(Long teamId) {
        return this.getAllTeamIdsInTeamTree(Collections.singletonList(teamId));
    }

    @Override
    public List<Long> getAllTeamIdsInTeamTree(List<Long> teamIds) {
        Set<Long> teamIdSet = new LinkedHashSet<>(teamIds);
        List<Long> parentIds = new ArrayList<>(teamIds);
        while (!parentIds.isEmpty()) {
            List<Long> subTeamIds = baseMapper.selectTeamIdByParentIdIn(parentIds);
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
        List<UnitTeam> teamList = baseMapper.selectList(wrapper);
        return buildTree(teamList, 0L);
    }

    @Override
    public List<UnitTeamVo> listByTeamId(Long teamId) {
        var subTeamIds = baseMapper.selectTeamIdsByParentId(teamId);
        if (CollUtil.isNotEmpty(subTeamIds)) {
            return findUnitTeamVo(subTeamIds);
        }
        return new ArrayList<>();
    }

    @Override
    public List<UnitTeamVo> findUnitTeamVo(List<Long> teamIds) {
        List<UnitTeamVo> unitTeamList = baseMapper.selectUnitTeamVoByTeamIds(teamIds);
        return unitTeamList.stream().peek(unitTeamVo -> {
            // the number of statistics
            int userCount = countUserCountByParentId(unitTeamVo.getTeamId());
            unitTeamVo.setUserCount(userCount);
            // query whether sub-departments exist
            List<Long> subTeamIds = baseMapper.selectTeamIdsByParentId(unitTeamVo.getTeamId());
            if (CollUtil.isNotEmpty(subTeamIds)) {
                unitTeamVo.setHasChildren(true);
                unitTeamVo.setHasChildrenTeam(true);
            } else {
                // query whether the department has members
                unitTeamVo.setHasChildren(userCount > 0);
                unitTeamVo.setHasChildrenTeam(false);
            }
        }).collect(Collectors.toList());
    }

    @Override
    public int countUserCountByParentId(Long teamId) {
        List<Long> allSubTeamIds = this.getAllTeamIdsInTeamTree(teamId);
        int count = 0;
        if (CollUtil.isNotEmpty(allSubTeamIds)) {
            count = unitTeamUserMapper.countByTeamId(allSubTeamIds);
        }
        return count;
    }

    private List<TreeNode> buildTree(List<UnitTeam> teamList, Serializable parentId) {
        return teamList.stream()
                .filter(t -> Objects.equals(t.getParentId(), parentId))
                .map(t -> {
                    List<TreeNode> children = buildTree(teamList, t.getId());
                    return TreeNode.builder()
                            .key(t.getId().toString())
                            .value(t.getId().toString())
                            .title(t.getTeamName())
                            .isLeaf(children.isEmpty())
                            .children(children)
                            .build();
                }).collect(Collectors.toList());
    }

}
