package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.common.exception.BackendException;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.common.util.TreeUtils;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import com.cloud0072.apigrid.framework.mapper.MenuNodeMapper;
import com.cloud0072.apigrid.framework.service.MenuNodeService;
import lombok.var;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
public class MenuNodeServiceImpl extends ServiceImpl<MenuNodeMapper, MenuNode> implements MenuNodeService {

    @Override
    public List<TreeNode> getNodeTree(QueryWrapper<MenuNode> wrapper) {
        var dataList = baseMapper.selectList(wrapper);
        var treeList = TreeUtils.buildTree(dataList, "0", "nodeType", "icon", "preNodeId");
        return TreeUtils.sortByPreNodeId(treeList);
    }

    @Override
    public MenuNode insertEntity(MenuNode entity) {
        var wrapper = new QueryWrapper<MenuNode>();
        wrapper.eq("parent_id", entity.getParentId()).eq("is_deleted", 0);
        var list = baseMapper.selectList(wrapper);
        if (list.size() > 0) {
            var latest = list.get(list.size() - 1);
            entity.setPreNodeId(latest.getNodeId());
        } else {
            entity.setPreNodeId("1");
        }

        var nodeName = getNodeName(entity.getNodeType(), list);
        entity.setNodeName(nodeName);
        entity.setCreateBy(SecurityUtils.getUserId());
        entity.setCreateTime(new Date());
        baseMapper.insert(entity);
        return entity;
    }

    /**
     * @param params 包含了节点的NodeId 新位置的ParentId 新位置的PreNodeId
     * @return
     */
    @Transactional(rollbackFor = Exception.class)
    @Override
    public int updatePositionByNodeId(MenuNode params) {
        // 自身节点
        var iNode = baseMapper.selectOne(new QueryWrapper<MenuNode>()
                .eq("is_deleted", 0)
                .eq("node_id", params.getNodeId()));
        // 旧位置后一个节点
        var oldNextNode = baseMapper.selectOne(new QueryWrapper<MenuNode>()
                .eq("is_deleted", 0)
                .eq("pre_node_id", params.getNodeId()));
        // 新位置后一个节点
        var newNextNode = baseMapper.selectOne(new QueryWrapper<MenuNode>()
                .eq("is_deleted", 0)
                .eq("parent_id", params.getParentId())
                .eq("pre_node_id", params.getPreNodeId()));

        // 更新 [旧位置后一个节点] 的preNodeId 为 [自身节点] 的preNodeId (移除自身，并缝合原链表)
        if (oldNextNode != null) {
            oldNextNode.setPreNodeId(iNode.getPreNodeId());
            baseMapper.updateById(oldNextNode);
        }

        // 更新 [新位置后一个节点] 的preNodeId 为 [自身节点] 的nodeId （插入新位置，并撑开原链表）
        if (newNextNode != null) {
            newNextNode.setPreNodeId(params.getNodeId());
            baseMapper.updateById(newNextNode);
        }

        // 更新 [自身节点] 的preNodeId 和 parentId 为新的
        if (iNode != null) {
            iNode.setParentId(params.getParentId()).setPreNodeId(params.getPreNodeId());
            baseMapper.updateById(iNode);
        }

        return 1;
    }

    @Override
    public void deleteByNodeId(String nodeId) {
        var node = baseMapper.selectOne(new QueryWrapper<MenuNode>().eq("node_id", nodeId).eq("is_deleted", 0));
        if (node == null) {
            return;
        }

        var childrenCount = baseMapper.selectCount(new QueryWrapper<MenuNode>().eq("parent_id", nodeId).eq("is_deleted", 0));
        if (childrenCount > 0) {
            throw new BackendException("请先删除子节点后重试");
        }

        node.setIsDeleted(1);
        baseMapper.updateById(node);

        var nextNode = baseMapper.selectOne(new QueryWrapper<MenuNode>().eq("pre_node_id", nodeId).eq("is_deleted", 0));
        if (nextNode != null) {
            nextNode.setPreNodeId(node.getPreNodeId());
            baseMapper.updateById(nextNode);
        }

    }

    private String getNodeName(Integer nodeType, List<MenuNode> menuNodes) {
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
