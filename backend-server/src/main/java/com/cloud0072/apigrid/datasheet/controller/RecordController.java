package com.cloud0072.apigrid.datasheet.controller;

import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.JSONUtils;
import com.cloud0072.apigrid.datasheet.service.RecordService;
import com.cloud0072.apigrid.datasheet.util.QueryUtils;
import com.cloud0072.apigrid.datasheet.vo.DatasheetQuery;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@RequestMapping("/record/{dstId}")
@RestController
public class RecordController {

    @Autowired
    private RecordService recordService;

    @PostMapping("/page")
    public AjaxResult selectEntityPage(@PathVariable("dstId") String dstId, @RequestBody DatasheetQuery dq) {
        var page = QueryUtils.getPageInfo(dq);
        var query = QueryUtils.getQuery(dq);
        var result = recordService.page(dstId, query, page, dq.getType());
        return AjaxResult.success(result);
    }

    @PostMapping("/list")
    public AjaxResult list(@PathVariable("dstId") String dstId, @RequestBody DatasheetQuery dq) {
        var query = QueryUtils.getQuery(dq);
        var result = recordService.list(dstId, query, dq.getType());
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
