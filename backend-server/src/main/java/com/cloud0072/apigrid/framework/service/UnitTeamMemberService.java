package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.framework.domain.UnitTeamMember;

import java.util.List;

public interface UnitTeamMemberService extends IService<UnitTeamMember> {

    List<Long> getMemberIdsByTeamId(Long teamId);

}
