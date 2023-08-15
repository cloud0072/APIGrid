package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.framework.domain.UnitTeamMember;
import com.cloud0072.apigrid.framework.mapper.UnitTeamMemberMapper;
import com.cloud0072.apigrid.framework.service.UnitTeamMemberService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitTeamMemberServiceImpl extends ServiceImpl<UnitTeamMemberMapper, UnitTeamMember> implements UnitTeamMemberService {

    @Override
    public List<Long> getMemberIdsByTeamId(Long teamId) {
        return baseMapper.selectMemberIdsByTeamId(teamId);
    }
}

