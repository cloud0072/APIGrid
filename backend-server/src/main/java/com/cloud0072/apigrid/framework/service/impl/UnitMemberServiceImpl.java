package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.domain.UnitTeamMember;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.mapper.UnitMemberMapper;
import com.cloud0072.apigrid.framework.service.UnitMemberService;
import com.cloud0072.apigrid.framework.service.UnitTeamMemberService;
import com.cloud0072.apigrid.framework.service.UserService;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitMemberServiceImpl extends ServiceImpl<UnitMemberMapper, UnitMember> implements UnitMemberService {

    @Autowired
    private UnitTeamMemberService unitTeamMemberService;

    @Autowired
    private UnitMemberService unitMemberService;

    @Autowired
    private UnitMemberMapper unitMemberMapper;

    @Autowired
    private UserService userService;

    @Override
    public AjaxResult addMember(MemberUserVo vo) {
        if (vo.getMobile() == null || vo.getNickName() == null) {
            throw new ServiceException("用户信息不完整");
        }
        User u = userService.getOne(new QueryWrapper<User>().eq("username", vo.getUsername()));
        if (u == null) {
            u = User.builder()
                    .username(vo.getMobile())
                    .password(vo.getPassword())
                    .mobile(vo.getMobile())
                    .email(vo.getEmail())
                    .nickName(vo.getNickName())
                    .avatar(vo.getAvatar())
                    .isLocked(0)
                    .isDeleted(0)
                    .build();
            userService.registerUser(u);
        } else {
            throw new ServiceException("改手机号已存在，请邀请该用户");
        }

        var member = UnitMember.builder()
                .memberName(vo.getNickName())
                .userId(u.getUserId())
                .status(0)
                .isAdmin(0)
                .isDeleted(0)
                .build();
        unitMemberService.save(member);

        if (StringUtils.isNotEmpty(vo.getTeamIds())) {
            var utmList = Arrays.stream(vo.getTeamIds().split(","))
                    .map(id -> new UnitTeamMember(null, member.getId(), Long.parseLong(id), new Date()))
                    .collect(Collectors.toList());
            unitTeamMemberService.saveBatch(utmList);
        }

        return AjaxResult.success(member);
    }

    @Override
    public Page<MemberUserVo> pageMemberUserByRootTeamId(Page<MemberUserVo> page, String isDeleted) {
        return unitMemberMapper.pageMemberUserByRootTeamId(page, isDeleted);
    }

    @Override
    public Page<MemberUserVo> pageMemberUserByTeamIds(Page<MemberUserVo> page, List<Long> teamIds, String isDeleted) {
        return unitMemberMapper.pageMemberUserByTeamIds(page, teamIds, isDeleted);
    }

}
