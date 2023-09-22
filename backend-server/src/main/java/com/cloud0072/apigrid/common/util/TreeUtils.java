package com.cloud0072.apigrid.common.util;

import cn.hutool.core.util.ReflectUtil;
import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.domain.TreeEntity;
import com.cloud0072.apigrid.common.domain.TreeNode;
import lombok.var;

import java.io.Serializable;
import java.util.LinkedList;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class TreeUtils {

    private static final String FirstNodePreNodeId = "1";

    public static <T extends TreeEntity> List<TreeNode> buildTree(List<T> dataList, Serializable parentId, String... cols) {
        return dataList.stream()
                .filter(t -> Objects.equals(t.getParentId(), parentId))
                .map(t -> {
                    var children = buildTree(dataList, t.getKey(), cols);
                    var node = TreeNode.builder()
                            .key(t.getKey().toString())
                            .value(t.getKey().toString())
                            .parentKey(t.getParentId().toString())
                            .title(t.getTitle())
                            .children(children)
//                            .isLeaf(children.isEmpty())
                            .build();
                    if (cols != null && cols.length > 0) {
                        var meta = new JSONObject();
                        for (String col : cols) {
                            meta.set(col, ReflectUtil.getFieldValue(t, col));
                        }
                        node.setMeta(meta);
                    }
                    return node;
                }).collect(Collectors.toList());
    }

    public static List<TreeNode> sortByPreNodeId(List<TreeNode> treeList) {
        for (TreeNode node : treeList) {
            if (node.getChildren() != null && node.getChildren().size() > 0) {
                node.setChildren(sortByPreNodeId(node.getChildren()));
            }
        }
        // o1.getKey().equals(o2.getMeta().getStr("preNodeId"))
        var result = new LinkedList<TreeNode>();
        var keyMap = treeList.stream()
                .collect(Collectors.toMap(n -> n.getMeta().getStr("preNodeId"), n -> n));
        for (int i = 0; i < keyMap.size(); i++) {
            var lastKey = i == 0 ? FirstNodePreNodeId : result.getLast().getKey();
            var nextNode = keyMap.get(lastKey);
            if (nextNode != null) {
                result.addLast(nextNode);
            }
        }
        return result;
    }
}
