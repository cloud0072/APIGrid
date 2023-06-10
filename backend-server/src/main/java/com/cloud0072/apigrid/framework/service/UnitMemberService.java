package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.vo.UserVo;

public interface UnitMemberService extends IService<UnitMember> {

    AjaxResult addMember(UserVo vo);

}
