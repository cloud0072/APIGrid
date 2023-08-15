package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.framework.domain.UnitTeamUser;
import com.cloud0072.apigrid.framework.mapper.UnitTeamUserMapper;
import com.cloud0072.apigrid.framework.service.UnitTeamUserService;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UnitTeamUserServiceImpl extends ServiceImpl<UnitTeamUserMapper, UnitTeamUser> implements UnitTeamUserService {

    @Override
    public List<Long> getUserIdsByTeamId(Long teamId) {
        return baseMapper.selectMemberIdsByTeamId(teamId);
    }
}

