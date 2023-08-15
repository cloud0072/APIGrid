package com.cloud0072.apigrid.framework.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.constant.ApigridConfig;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.Unit;
import com.cloud0072.apigrid.framework.domain.UnitMember;
import com.cloud0072.apigrid.framework.domain.UnitTeamMember;
import com.cloud0072.apigrid.framework.domain.User;
import com.cloud0072.apigrid.framework.mapper.UnitMapper;
import com.cloud0072.apigrid.framework.mapper.UnitMemberMapper;
import com.cloud0072.apigrid.framework.service.UnitMemberService;
import com.cloud0072.apigrid.framework.service.UnitTeamMemberService;
import com.cloud0072.apigrid.framework.service.UserService;
import com.cloud0072.apigrid.framework.vo.MemberUserVo;
import com.cloud0072.apigrid.framework.vo.UnitMemberVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitMemberServiceImpl extends ServiceImpl<UnitMemberMapper, UnitMember> implements UnitMemberService {

    @Autowired
    private UnitTeamMemberService teamMemberService;

    @Autowired
    private UnitMemberMapper memberMapper;

    @Autowired
    private UnitMapper unitMapper;

    @Autowired
    private UserService userService;

    @Autowired
    private ApigridConfig apigridConfig;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public AjaxResult insertMemberUser(MemberUserVo vo) {
        if (vo.getMobile() == null || vo.getNickName() == null) {
            throw new ServiceException("请求失败，用户信息不完整");
        }
        if (StringUtils.isEmpty(vo.getPassword())) {
            vo.setPassword(apigridConfig.getDefaultPassword());
        }
        User user = userService.getOne(new QueryWrapper<User>().eq("username", vo.getUsername()));
        if (user != null) {
            throw new ServiceException("请求失败，该账号已存在");
        }
        var avatarColor = vo.getAvatarColor() == null ? 10 : vo.getAvatarColor();
        user = User.builder()
                .username(vo.getMobile())
                .password(vo.getPassword())
                .mobile(vo.getMobile())
                .email(vo.getEmail())
                .nickName(vo.getNickName())
                .avatar(vo.getAvatar())
                .avatarColor(avatarColor)
                .isLocked(0)
                .isDeleted(0)
                .build();
        userService.registerUser(user);

        var unitMember = UnitMember.builder()
                .memberName(vo.getNickName())
                .userId(user.getUserId())
                .status(0)
                .isAdmin(0)
                .isDeleted(0)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        memberMapper.insert(unitMember);
        var unit = Unit.builder()
                .unitType(3)
                .unitRefId(unitMember.getId())
                .isDeleted(0)
                .createTime(new Date())
                .updateTime(new Date())
                .build();
        unitMapper.insert(unit);

        var teamIds = vo.getTeamIds() == null ? "0" : vo.getTeamIds();
        var utmList = Arrays.stream(teamIds.split(","))
                .map(id -> new UnitTeamMember(null, unitMember.getId(), Long.parseLong(id), new Date()))
                .collect(Collectors.toList());
        teamMemberService.remove(new QueryWrapper<UnitTeamMember>().eq("member_id", unitMember.getId()));
        teamMemberService.saveBatch(utmList);

        return AjaxResult.success(unitMember);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public AjaxResult updateMemberUser(MemberUserVo vo) {
        if (vo.getMobile() == null || vo.getNickName() == null) {
            throw new ServiceException("用户信息不完整");
        }
        var user = userService.getById(vo.getUserId());
        if (user == null) {
            throw new ServiceException("该账号不存在");
        }
        if (!user.getMobile().equals(vo.getMobile())) {
            var users = userService.list(new QueryWrapper<User>().eq("mobile", vo.getMobile()));
            if (users.isEmpty()) {
                var username = "admin".equals(user.getUsername()) ? "admin" : vo.getMobile();
                user.setMobile(vo.getMobile()).setUsername(username);
            }
        }
        user.setNickName(vo.getNickName()).setEmail(vo.getEmail()).setAvatar(vo.getAvatar()).setUpdateTime(new Date());
        userService.updateById(user);

        var member = memberMapper.selectById(vo.getMemberId());
        if (member == null) {
            throw new ServiceException("成员信息不完整");
        }
        member.setMemberName(vo.getNickName()).setUpdateTime(new Date());
        memberMapper.updateById(member);

        var teamIds = vo.getTeamIds() == null ? "0" : vo.getTeamIds();
        var utmList = Arrays.stream(teamIds.split(","))
                .map(id -> new UnitTeamMember(null, member.getId(), Long.parseLong(id), new Date()))
                .collect(Collectors.toList());
        teamMemberService.remove(new QueryWrapper<UnitTeamMember>().eq("member_id", member.getId()));
        teamMemberService.saveBatch(utmList);
        return AjaxResult.success(member);
    }

    @Override
    public AjaxResult updateUserAvatar(MemberUserVo vo) {
        var user = userService.getById(vo.getUserId());
        if (user == null) {
            throw new ServiceException("该账号不存在");
        }

        return AjaxResult.success();
    }

    @Override
    public MemberUserVo getMemberUserById(String id) {
        return memberMapper.getMemberUserById(id);
    }

    @Override
    public Page<MemberUserVo> pageMemberUserByRootTeamId(Page<MemberUserVo> page, String isDeleted) {
        return memberMapper.pageMemberUserByRootTeamId(page, isDeleted);
    }

    @Override
    public Page<MemberUserVo> pageMemberUserByTeamIds(Page<MemberUserVo> page, List<Long> teamIds, String isDeleted) {
        return memberMapper.pageMemberUserByTeamIds(page, teamIds, isDeleted);
    }

    @Override
    public List<UnitMemberVo> listByTeamId(Long teamId) {
        // getting a member list
        if (teamId != null && teamId != 0) {
            List<Long> memberIds = teamMemberService.getMemberIdsByTeamId(teamId);
            if (CollUtil.isNotEmpty(memberIds)) {
                return findUnitMemberVo(memberIds);
            }
        }
        return new ArrayList<>();
    }

    @Override
    public List<UnitMemberVo> findUnitMemberVo(List<Long> memberIds) {
        if (CollUtil.isEmpty(memberIds)) {
            return new ArrayList<>();
        }
        List<UnitMemberVo> vos = new ArrayList<>();
        List<List<Long>> split = CollUtil.split(memberIds, 1000);
        for (List<Long> ids : split) {
            vos.addAll(memberMapper.selectUnitMemberByMemberIds(ids));
        }
        return vos;
    }

}
