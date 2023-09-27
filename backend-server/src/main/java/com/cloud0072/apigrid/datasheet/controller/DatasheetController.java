package com.cloud0072.apigrid.datasheet.controller;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

@RequestMapping("/datasheet")
@RestController
public class DatasheetController {

    @Autowired
    private DatasheetService datasheetService;

    private PageRequest getPageInfo(HttpServletRequest request) {
        String pageSize = request.getParameter("pageSize");
        String pageNum = request.getParameter("pageNum");
        int size = StringUtils.isEmpty(pageSize) ? 20 : Integer.parseInt(pageSize);
        int num = StringUtils.isEmpty(pageNum) ? 1 : Integer.parseInt(pageNum);
        return PageRequest.of(num, size);
    }

    @GetMapping("/page")
    public AjaxResult selectEntityPage(Datasheet entity, HttpServletRequest request) {
        PageRequest page = getPageInfo(request);
        var query = new Query();
        query.addCriteria(Criteria.byExample(entity));
        return AjaxResult.success(datasheetService.page(query, page));
    }

    @GetMapping("/list")
    public AjaxResult list(Datasheet entity) {
        entity.setIsDeleted(0);
        var result = datasheetService.findAll(entity);
        return AjaxResult.success(result);
    }

    @GetMapping("/{dstId}")
    public AjaxResult findByDstId(@PathVariable("dstId") String dstId) {
        var result = datasheetService.findByDstId(dstId);
        return AjaxResult.success(result);
    }

    @PostMapping
    public AjaxResult insert(@RequestBody Datasheet datasheet) {
        var result = datasheetService.insert(datasheet);
        return AjaxResult.success(result);
    }

    @PutMapping
    public AjaxResult updateByDstId(@RequestBody Datasheet datasheet) {
        var result = datasheetService.updateByDstId(datasheet);
        return AjaxResult.success(result);
    }

    @DeleteMapping("/{dstIds}")
    public AjaxResult deleteByDstIds(@PathVariable("dstIds") String dstIds) {
        var ids = Arrays.asList(dstIds.split(","));
        datasheetService.deleteByDstIds(ids);
        return AjaxResult.success();
    }

}
