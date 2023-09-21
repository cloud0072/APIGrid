package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import com.cloud0072.apigrid.framework.service.MenuNodeService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/menuNode")
@RestController
public class MenuNodeController extends BaseController<MenuNode> {

    @Autowired
    private MenuNodeService menuNodeService;

    @GetMapping("/getNodeTree")
    public AjaxResult getNodeTree() {
        var wrapper = new QueryWrapper<MenuNode>();
        wrapper.eq("is_deleted", 0);
        List<TreeNode> nodeTree = menuNodeService.getNodeTree(wrapper);
        return AjaxResult.success(nodeTree);
    }

}
