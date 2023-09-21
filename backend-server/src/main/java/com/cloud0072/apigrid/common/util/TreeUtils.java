package com.cloud0072.apigrid.common.util;

import cn.hutool.core.util.ReflectUtil;
import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.cloud0072.apigrid.common.domain.TreeEntity;
import com.cloud0072.apigrid.common.domain.TreeNode;
import lombok.var;

import java.io.Serializable;
import java.util.List;
import java.util.Objects;
import java.util.stream.Collectors;

public class TreeUtils {

    public static <T extends TreeEntity> List<TreeNode> buildTree(List<T> dataList, Serializable parentId, String... cols) {
        return dataList.stream()
                .filter(t -> Objects.equals(t.getParentId(), parentId))
                .map(t -> {
                    var children = buildTree(dataList, t.getKey(), cols);
                    var node = TreeNode.builder()
                            .key(t.getKey().toString())
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

}
