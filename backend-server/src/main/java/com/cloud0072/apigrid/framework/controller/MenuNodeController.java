package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.conditions.update.UpdateWrapper;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.domain.TreeNode;
import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import com.cloud0072.apigrid.framework.service.MenuNodeService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@RequestMapping("/menuNode")
@RestController
public class MenuNodeController extends BaseController<MenuNode> {

    @Autowired
    private MenuNodeService menuNodeService;

    @Autowired
    private DatasheetService datasheetService;

    @GetMapping("/getNodeTree")
    public AjaxResult getNodeTree() {
        var wrapper = new QueryWrapper<MenuNode>()
                .eq("is_deleted", 0);
        List<TreeNode> nodeTree = menuNodeService.getNodeTree(wrapper);
        return AjaxResult.success(nodeTree);
    }

    @PostMapping
    protected AjaxResult insertEntity(@RequestBody MenuNode t) {
        menuNodeService.insertEntity(t);
        // 创建表格
        if (t.getNodeType() == 2) {
            datasheetService.initDatasheet(t);
        }
        return AjaxResult.success(t);
    }

    @PutMapping("/updateByNodeId")
    public AjaxResult updateByNodeId(@RequestBody MenuNode menuNode) {
        var wrapper = new UpdateWrapper<MenuNode>()
                .eq("node_id", menuNode.getNodeId());
        menuNodeService.update(menuNode, wrapper);
        return AjaxResult.success();
    }

    @PutMapping("/updatePositionByNodeId")
    public AjaxResult updatePositionByNodeId(@RequestBody MenuNode menuNode) {
        menuNodeService.updatePositionByNodeId(menuNode);
        return AjaxResult.success();
    }

    @DeleteMapping("/deleteByNodeId/{nodeId}")
    protected AjaxResult deleteEntity(@PathVariable("nodeId") String nodeId) {
        menuNodeService.deleteByNodeId(nodeId); //update(MenuNode.builder().isDeleted(1).build(), wrapper)
        datasheetService.deleteByDstIds(Collections.singletonList(nodeId));
        return AjaxResult.success();
    }

}
