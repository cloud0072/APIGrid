package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.metadata.IPage;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.framework.domain.Unit;
import com.cloud0072.apigrid.framework.domain.UnitRoleMember;
import com.cloud0072.apigrid.framework.mapper.UnitMapper;
import com.cloud0072.apigrid.framework.mapper.UnitMemberMapper;
import com.cloud0072.apigrid.framework.mapper.UnitRoleMemberMapper;
import com.cloud0072.apigrid.framework.mapper.UnitTeamMapper;
import com.cloud0072.apigrid.framework.service.UnitRoleMemberService;
import com.cloud0072.apigrid.framework.vo.RoleMemberVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitRoleMemberServiceImpl extends ServiceImpl<UnitRoleMemberMapper, UnitRoleMember> implements UnitRoleMemberService {

    @Autowired
    private UnitRoleMemberMapper unitRoleMemberMapper;

    @Autowired
    private UnitMemberMapper unitMemberMapper;

    @Autowired
    private UnitTeamMapper unitTeamMapper;

    @Autowired
    private UnitMapper unitMapper;

    @Override
    public IPage<RoleMemberVo> pageRoleMember(Page<UnitRoleMember> page, Long roleId) {
        var query = new QueryWrapper<UnitRoleMember>().eq("role_id", roleId);
        var pageInfo = unitRoleMemberMapper.selectPage(page, query);
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
    public List<Long> insertRoleMember(Long roleId, List<UnitRoleMember> roleMemberList) {
        var members = new ArrayList<UnitRoleMember>();
        if (!roleMemberList.isEmpty()) {
            var query = new QueryWrapper<UnitRoleMember>().select("unit_ref_id").eq("role_id", roleId);
            var existIds = unitRoleMemberMapper.selectList(query).stream().map(UnitRoleMember::getUnitRefId).collect(Collectors.toList());
            roleMemberList.stream()
                    .filter(rm -> !existIds.contains(rm.getUnitRefId()))
                    .forEach(rm -> members.add(UnitRoleMember.builder()
                            .roleId(roleId)
                            .unitType(rm.getUnitType())
                            .unitRefId(rm.getUnitRefId())
                            .createTime(new Date())
                            .build()));
            saveBatch(members);
            return members.stream().map(UnitRoleMember::getId).collect(Collectors.toList());
        }
        return new ArrayList<>();
    }

    @Override
    public int removeRoleMember(Long roleId, List<Long> unitIds) {
        var unitRefIds = unitMapper.selectBatchIds(unitIds).stream().map(Unit::getUnitRefId).collect(Collectors.toList());
        return unitRoleMemberMapper.delete(new QueryWrapper<UnitRoleMember>().eq("role_id", roleId).in("unit_ref_id", unitRefIds));
    }

    /**
     * SELECT
     * um.*
     * FROM
     * apitable_unit_role ur
     * LEFT JOIN apitable_unit_role_member urm ON ur.id = urm.role_id
     * LEFT JOIN apitable_unit_member um ON um.id = urm.unit_ref_id
     * LEFT JOIN apitable_user uv on uv.id = um.user_id
     * WHERE
     * u.unit_type = 3
     * AND u.is_deleted = 0
     * AND uv.is_deleted = 0
     *
     * @param records
     * @return
     */
    private List<RoleMemberVo> convertMember(List<UnitRoleMember> records) {
        var members = records.stream().filter(rm -> rm.getUnitType() == 3).collect(Collectors.toList());
        var refIds = members.stream().map(UnitRoleMember::getUnitRefId).collect(Collectors.toList());
        return refIds.isEmpty() ? new ArrayList<>() : unitMemberMapper.getRoleMemberByIds(refIds);
    }

    /**
     * SELECT
     * ut.*
     * FROM
     * apitable_unit_role ur
     * LEFT JOIN apitable_unit_role_member urm ON ur.id = urm.role_id
     * LEFT JOIN apitable_unit_team ut ON ut.id = urm.unit_ref_id
     * WHERE
     * urm.unit_type = 1
     * AND ut.is_deleted = 0;
     *
     * @param records
     * @return
     */
    private List<RoleMemberVo> convertTeam(List<UnitRoleMember> records) {
        var teams = records.stream().filter(rm -> rm.getUnitType() == 1).collect(Collectors.toList());
        var refIds = teams.stream().map(UnitRoleMember::getUnitRefId).collect(Collectors.toList());
        return refIds.isEmpty() ? new ArrayList<>() : unitTeamMapper.getRoleTeamByIds(refIds);
    }

}
