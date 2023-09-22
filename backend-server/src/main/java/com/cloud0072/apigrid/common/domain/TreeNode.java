package com.cloud0072.apigrid.common.domain;

import cn.hutool.json.JSONObject;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Builder
@Data
public class TreeNode {

    private String title;

    private String key;

    private String value;

    private String parentKey;

    private Boolean isLeaf;

    private JSONObject meta;

    private List<TreeNode> children;

}
