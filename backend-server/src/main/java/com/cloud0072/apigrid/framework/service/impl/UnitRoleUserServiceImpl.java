package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.framework.domain.Unit;
import com.cloud0072.apigrid.framework.domain.UnitRoleUser;
import com.cloud0072.apigrid.framework.mapper.UnitMapper;
import com.cloud0072.apigrid.framework.mapper.UnitUserMapper;
import com.cloud0072.apigrid.framework.mapper.UnitRoleUserMapper;
import com.cloud0072.apigrid.framework.mapper.UnitTeamMapper;
import com.cloud0072.apigrid.framework.service.UnitRoleUserService;
import com.cloud0072.apigrid.framework.vo.UnitRoleUserVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitRoleUserServiceImpl extends ServiceImpl<UnitRoleUserMapper, UnitRoleUser> implements UnitRoleUserService {

    @Autowired
    private UnitRoleUserMapper unitRoleUserMapper;

    @Autowired
    private UnitUserMapper unitUserMapper;

    @Autowired
    private UnitTeamMapper unitTeamMapper;

    @Autowired
    private UnitMapper unitMapper;

    @Override
    public IPage<UnitRoleUserVo> pageRoleUser(Page<UnitRoleUser> page, Long roleId) {
        var query = new QueryWrapper<UnitRoleUser>().eq("role_id", roleId);
        var pageInfo = unitRoleUserMapper.selectPage(page, query);
        var teamList = convertTeam(pageInfo.getRecords());
        var memberList = convertMember(pageInfo.getRecords());
        return pageInfo.convert(record -> {
            if (record.getUnitType() == 1) {
                return teamList.stream().filter(t -> t.getUnitRefId().equals(record.getUnitRefId())).findFirst().get();
            } else {
                return memberList.stream().filter(m -> m.getUnitRefId().equals(record.getUnitRefId())).findFirst().get();
            }
        });
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public List<Long> insertRoleUser(Long roleId, List<UnitRoleUser> roleMemberList) {
        var members = new ArrayList<UnitRoleUser>();
        if (!roleMemberList.isEmpty()) {
            var query = new QueryWrapper<UnitRoleUser>().select("unit_ref_id").eq("role_id", roleId);
            var existIds = unitRoleUserMapper.selectList(query).stream().map(UnitRoleUser::getUnitRefId).collect(Collectors.toList());
            roleMemberList.stream()
                    .filter(rm -> !existIds.contains(rm.getUnitRefId()))
                    .forEach(rm -> members.add(UnitRoleUser.builder()
                            .roleId(roleId)
                            .unitType(rm.getUnitType())
                            .unitRefId(rm.getUnitRefId())
                            .updateBy(SecurityUtils.getUserId())
                            .updateTime(new Date())
                            .build()));
            saveBatch(members);
            return members.stream().map(UnitRoleUser::getId).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public int removeRoleUser(Long roleId, List<Long> unitIds) {
        var unitRefIds = unitMapper.selectBatchIds(unitIds).stream().map(Unit::getUnitRefId).collect(Collectors.toList());
        return unitRoleUserMapper.delete(new QueryWrapper<UnitRoleUser>().eq("role_id", roleId).in("unit_ref_id", unitRefIds));
    }

    /**
     * SELECT
     * um.*
     * FROM
     * apitable_unit_role ur
     * LEFT JOIN apitable_unit_role_user urm ON ur.id = urm.role_id
     * LEFT JOIN apitable_unit_user um ON um.id = urm.unit_ref_id
     * LEFT JOIN apitable_user uv on uv.id = um.user_id
     * WHERE
     * u.unit_type = 3
     * AND u.is_deleted = 0
     * AND uv.is_deleted = 0
     *
     * @param records
     * @return
     */
    private List<UnitRoleUserVo> convertMember(List<UnitRoleUser> records) {
        var members = records.stream().filter(rm -> rm.getUnitType() == 3).collect(Collectors.toList());
        var refIds = members.stream().map(UnitRoleUser::getUnitRefId).collect(Collectors.toList());
        return refIds.isEmpty() ? new ArrayList<>() : unitUserMapper.getRoleUserByIds(refIds);
    }

    /**
     * SELECT
     * ut.*
     * FROM
     * apitable_unit_role ur
     * LEFT JOIN apitable_unit_role_user urm ON ur.id = urm.role_id
     * LEFT JOIN apitable_unit_team ut ON ut.id = urm.unit_ref_id
     * WHERE
     * urm.unit_type = 1
     * AND ut.is_deleted = 0;
     *
     * @param records
     * @return
     */
    private List<UnitRoleUserVo> convertTeam(List<UnitRoleUser> records) {
        var teams = records.stream().filter(rm -> rm.getUnitType() == 1).collect(Collectors.toList());
        var refIds = teams.stream().map(UnitRoleUser::getUnitRefId).collect(Collectors.toList());
        return refIds.isEmpty() ? new ArrayList<>() : unitTeamMapper.getRoleTeamByIds(refIds);
    }

}
