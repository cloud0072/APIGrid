package com.cloud0072.apigrid.framework.service.impl;

import cn.hutool.core.collection.CollUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.constant.ApigridConfig;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.domain.LoginUser;
import com.cloud0072.apigrid.common.exception.ServiceException;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.domain.Unit;
import com.cloud0072.apigrid.framework.domain.UnitUser;
import com.cloud0072.apigrid.framework.domain.UnitTeamUser;
import com.cloud0072.apigrid.framework.mapper.UnitMapper;
import com.cloud0072.apigrid.framework.mapper.UnitUserMapper;
import com.cloud0072.apigrid.framework.service.UnitUserService;
import com.cloud0072.apigrid.framework.service.UnitTeamUserService;
import com.cloud0072.apigrid.framework.vo.UnitTeamUserVo;
import com.cloud0072.apigrid.framework.vo.UnitUserVo;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UnitUserServiceImpl extends ServiceImpl<UnitUserMapper, UnitUser>
        implements UnitUserService, UserDetailsService {

    @Autowired
    private UnitTeamUserService teamUserService;

    @Autowired
    private UnitMapper unitMapper;

    @Autowired
    private ApigridConfig apigridConfig;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Transactional(rollbackFor = Exception.class)
    @Override
    public AjaxResult registerUnitUser(UnitTeamUserVo vo) {
        if (StringUtils.isEmpty(vo.getPassword())) {
            var defaultPwd = apigridConfig.getDefaultPassword();
            vo.setPassword(defaultPwd);
        }
        checkMember(vo);

        var unitUser = UnitUser.builder()
                .nickName(vo.getNickName())
                .username(vo.getMobile())
                .password(passwordEncoder.encode(vo.getPassword()))
                .mobile(vo.getMobile())
                .email(vo.getEmail())
                .avatar(vo.getAvatar())
                .avatarColor(vo.getAvatarColor() == null ? 10 : vo.getAvatarColor())
                .isAdmin(0)
                .isLocked(0)
                .isDeleted(0)
                .createBy(SecurityUtils.getUserId())
                .createTime(new Date())
                .updateBy(SecurityUtils.getUserId())
                .updateTime(new Date())
                .build();
        baseMapper.insert(unitUser);

        var unit = Unit.builder()
                .unitType(3)
                .unitRefId(unitUser.getId())
                .isDeleted(0)
                .updateBy(SecurityUtils.getUserId())
                .updateTime(new Date())
                .build();
        unitMapper.insert(unit);

        var teamIds = vo.getTeamIds() == null ? "0" : vo.getTeamIds();
        var utmList = Arrays.stream(teamIds.split(","))
                .map(id -> new UnitTeamUser(null, unitUser.getId(), Long.parseLong(id), SecurityUtils.getUserId(), new Date()))
                .collect(Collectors.toList());
        teamUserService.remove(new QueryWrapper<UnitTeamUser>().eq("user_id", unitUser.getId()));
        teamUserService.saveBatch(utmList);

        return AjaxResult.success(unitUser);
    }

    @Transactional(rollbackFor = Exception.class)
    @Override
    public AjaxResult updateUnitUser(UnitTeamUserVo vo) {
        if (vo.getMobile() == null || vo.getNickName() == null) {
            throw new ServiceException("用户信息不完整");
        }
        var unitUser = baseMapper.selectById(vo.getUserId());
        if (unitUser == null) {
            throw new ServiceException("该账号不存在");
        }
        if (!unitUser.getMobile().equals(vo.getMobile())) {
            var unitUserList = baseMapper.selectList(new QueryWrapper<UnitUser>().eq("mobile", vo.getMobile()));
            if (unitUserList.isEmpty()) {
                var username = "admin".equals(unitUser.getUsername()) ? "admin" : vo.getMobile();
                unitUser.setUsername(username);
            }
        }
        // .setMobile(vo.getMobile()) 必填不能更改
        unitUser.setNickName(vo.getNickName()).setEmail(vo.getEmail())
                .setAvatar(vo.getAvatar()).setUpdateTime(new Date());
        baseMapper.updateById(unitUser);

        var teamIds = vo.getTeamIds() == null ? "0" : vo.getTeamIds();
        var utmList = Arrays.stream(teamIds.split(","))
                .map(id -> new UnitTeamUser(null, unitUser.getId(), Long.parseLong(id), SecurityUtils.getUserId(), new Date()))
                .collect(Collectors.toList());
        teamUserService.remove(new QueryWrapper<UnitTeamUser>().eq("user_id", unitUser.getId()));
        teamUserService.saveBatch(utmList);
        return AjaxResult.success(unitUser);
    }

    @Override
    public AjaxResult deleteUnitUser(Long userId) {
        var unitUser = baseMapper.selectById(userId);
        unitUser.setIsDeleted(1);
        var i = baseMapper.updateById(unitUser);
        return AjaxResult.success();
    }

    @Override
    public AjaxResult updateUserAvatar(UnitTeamUserVo vo) {
        var unitUser = baseMapper.selectById(vo.getUserId());
        if (unitUser == null) {
            throw new ServiceException("该账号不存在");
        }
        unitUser.setAvatar(vo.getAvatar());
        baseMapper.updateById(unitUser);
        return AjaxResult.success();
    }

    @Override
    public void resetPassword(UnitTeamUserVo vo) {
        if (StringUtils.isEmpty(vo.getNewPwd())) {
            throw new ServiceException("请输入新密码");
        }
        var unitUser = baseMapper.selectById(vo.getUserId());
        if (unitUser == null) {
            return;
        }
        if (!passwordEncoder.matches(vo.getPassword(), unitUser.getPassword())) {
            throw new ServiceException("原密码错误");
        }
        unitUser.setPassword(passwordEncoder.encode(vo.getNewPwd()));
        baseMapper.updateById(unitUser);
    }

    @Override
    public UnitTeamUserVo getTeamUserById(String id) {
        return baseMapper.getTeamUserById(id);
    }

    @Override
    public Page<UnitTeamUserVo> pageTeamUserByRootTeamId(Page<UnitTeamUserVo> page, String isDeleted) {
        return baseMapper.pageTeamUserByRootTeamId(page, isDeleted);
    }

    @Override
    public Page<UnitTeamUserVo> pageTeamUserByTeamIds(Page<UnitTeamUserVo> page, List<Long> teamIds, String isDeleted) {
        return baseMapper.pageTeamUserByTeamIds(page, teamIds, isDeleted);
    }

    @Override
    public List<UnitUserVo> listByTeamId(Long teamId) {
        // getting a member list
        if (teamId != null && teamId != 0) {
            List<Long> unitUserIds = teamUserService.getUserIdsByTeamId(teamId);
            if (CollUtil.isNotEmpty(unitUserIds)) {
                return findUnitUserVo(unitUserIds);
            }
        }
        return new ArrayList<>();
    }

    @Override
    public List<UnitUserVo> findUnitUserVo(List<Long> unitUserIds) {
        if (CollUtil.isEmpty(unitUserIds)) {
            return new ArrayList<>();
        }
        List<UnitUserVo> vos = new ArrayList<>();
        List<List<Long>> split = CollUtil.split(unitUserIds, 1000);
        for (List<Long> ids : split) {
            vos.addAll(baseMapper.selectUserByIds(ids));
        }
        return vos;
    }

    @Override
    public UserDetails loadUserByUsername(String username) {
        UnitUser unitUser = baseMapper.selectUserByUsername(username);
        if (StringUtils.isNull(unitUser)) {
            throw new ServiceException("登录用户：" + username + " 不存在");
        }
        LoginUser loginUser = new LoginUser(unitUser);
        if (!loginUser.isAccountNonLocked()) {
            throw new ServiceException("登录用户：" + username + " 该账号已被锁定");
        } else if (!loginUser.isEnabled()) {
            throw new ServiceException("登录用户：" + username + " 该账号已被禁用");
        }
        return loginUser;
    }

    private void checkMember(UnitTeamUserVo unitUser) {
        String mobile = unitUser.getMobile();
        if (StringUtils.isNotEmpty(mobile)) {
            UnitUser user1 = baseMapper.selectUserByMobile(mobile);
            if (StringUtils.isNotNull(user1)) {
                throw new ServiceException("该手机号已被注册");
            }
        }
        String username = unitUser.getUsername();
        if (StringUtils.isNotEmpty(username)) {
            if (username.length() < 4 || username.length() >= 32) {
                throw new ServiceException("用户名长度必须在4-32之间");
            }
            UnitUser user1 = baseMapper.selectUserByUsername(username);
            if (StringUtils.isNotNull(user1)) {
                throw new ServiceException("该用户名已被注册");
            }
        }
        String password = unitUser.getPassword();
        if (StringUtils.isNotEmpty(password)) {
            if (password.length() < 4 || password.length() >= 32) {
                throw new ServiceException("密码长度必须在4-32之间");
            }
        }
    }

}
