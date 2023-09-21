package com.cloud0072.apigrid.common.domain;

import cn.hutool.json.JSONObject;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class TreeNode {

    private String title;

    private String key;

    private String parentKey;

    private Boolean isLeaf;

    private JSONObject meta;

    private List<TreeNode> children;

}
