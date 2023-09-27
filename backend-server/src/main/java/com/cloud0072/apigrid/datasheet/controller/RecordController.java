package com.cloud0072.apigrid.datasheet.controller;

import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.datasheet.service.RecordService;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;

@RequestMapping("/record/{dstId}")
@RestController
public class RecordController {

    @Autowired
    private RecordService recordService;

    private PageRequest getPageInfo(HttpServletRequest request) {
        String pageSize = request.getParameter("pageSize");
        String pageNum = request.getParameter("pageNum");
        int size = StringUtils.isEmpty(pageSize) ? 20 : Integer.parseInt(pageSize);
        int num = StringUtils.isEmpty(pageNum) ? 1 : Integer.parseInt(pageNum);
        return PageRequest.of(num, size);
    }

    @GetMapping("/page")
    public AjaxResult selectEntityPage(@PathVariable("dstId") String dstId, HttpServletRequest request) {
        var type = request.getParameter("type");
        var query = new Query();
//        query.addCriteria(Criteria.byExample(entity));
        PageRequest page = getPageInfo(request);
        return AjaxResult.success(recordService.page(dstId, query, page, type));
    }

    @GetMapping("/list")
    public AjaxResult list(@PathVariable("dstId") String dstId, HttpServletRequest request) {
        var type = request.getParameter("type");
//        entity.setIsDeleted(0);
        var result = recordService.list(dstId, null, type);
        return AjaxResult.success(result);
    }

    @GetMapping("/{recId}")
    public AjaxResult findByRecId(@PathVariable("dstId") String dstId, @PathVariable("recId") String recId, String type) {
        var result = recordService.findByRecId(dstId, recId, type);
        return AjaxResult.success(result);
    }

    @PostMapping
    public AjaxResult batchInsert(@PathVariable("dstId") String dstId, @RequestBody List<JSONObject> records, String type) {
        var result = recordService.batchInsert(dstId, records, type);
        return AjaxResult.success(result);
    }

    @PutMapping
    public AjaxResult batchUpdate(@PathVariable("dstId") String dstId, @RequestBody List<JSONObject> records, String type) {
        var result = recordService.batchUpdate(dstId, records, type);
        return AjaxResult.success(result);
    }

    @DeleteMapping("/{recIds}")
    public AjaxResult deleteByRecIds(@PathVariable("dstId") String dstId, @PathVariable("recIds") String recIds) {
        var ids = Arrays.asList(recIds.split(","));
        recordService.deleteByRecIds(dstId, ids);
        return AjaxResult.success();
    }

}
