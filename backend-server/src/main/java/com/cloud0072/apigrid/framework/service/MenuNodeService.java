package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.framework.domain.MenuNode;

import java.util.List;

public interface MenuNodeService extends IService<MenuNode> {

    List<TreeNode> getNodeTree(QueryWrapper<MenuNode> wrapper);

}
