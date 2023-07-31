package com.cloud0072.apigrid.common.domain;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class TreeNode {

    private String title;

    private String key;

    private String value;

    private Boolean isLeaf;

    private List<TreeNode> children;

}
