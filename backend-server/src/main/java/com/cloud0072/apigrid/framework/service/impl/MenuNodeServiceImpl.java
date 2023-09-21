package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.common.util.TreeUtils;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import com.cloud0072.apigrid.framework.mapper.MenuNodeMapper;
import com.cloud0072.apigrid.framework.service.MenuNodeService;
import lombok.var;
import org.checkerframework.checker.units.qual.A;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MenuNodeServiceImpl extends ServiceImpl<MenuNodeMapper, MenuNode> implements MenuNodeService {

    @Override
    public List<TreeNode> getNodeTree(QueryWrapper<MenuNode> wrapper) {
        var dataList = baseMapper.selectList(wrapper);
        return TreeUtils.buildTree(dataList, "-1", "nodeType", "icon");
    }

    @Override
    public boolean save(MenuNode entity) {
        var wrapper = new QueryWrapper<MenuNode>();
        wrapper.eq("parent_id", entity.getParentId());
        var list = baseMapper.selectList(wrapper);
        var nodeName = createNodeName(entity.getNodeType(), list);
        entity.setNodeName(nodeName);
        entity.setCreateBy(SecurityUtils.getUserId());
        entity.setCreateTime(new Date());
        return super.save(entity);
    }

    private String createNodeName(Integer nodeType, List<MenuNode> menuNodes) {
        var name = "新建" + (nodeType == 1 ? "文件夹" : nodeType == 2 ? "空白表格" : nodeType == 4 ? "仪表盘" : "表单");
        if (menuNodes.stream().noneMatch(node -> node.getNodeName().equals(name))) {
            return name;
        }
        AtomicInteger i = new AtomicInteger(0);
        while (true) {
            var n = name + i.addAndGet(1);
            if (menuNodes.stream().noneMatch(node -> node.getNodeName().equals(n))) {
                return n;
            }
        }
    }
}
