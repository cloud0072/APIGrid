package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.IService;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.Arrays;

public abstract class BaseController<T> {

    @Autowired
    protected IService<T> baseService;

    @GetMapping("/page")
    protected AjaxResult selectEntityPage(T t, HttpServletRequest request) {
        Page<T> page = getPageInfo(request);
        QueryWrapper<T> wrapper = new QueryWrapper<>(t);
        return AjaxResult.success(baseService.page(page, wrapper));
    }

    @GetMapping("/list")
    protected AjaxResult selectEntityList(T t) {
        QueryWrapper<T> wrapper = new QueryWrapper<>(t);
        return AjaxResult.success(baseService.list(wrapper));
    }

    @GetMapping("/{id}")
    protected AjaxResult selectEntityById(@PathVariable("id") Serializable id) {
        return AjaxResult.success(baseService.getById(id));
    }

    @PostMapping
    protected AjaxResult insertEntity(@RequestBody T t) {
        baseService.save(t);
        return AjaxResult.success(t);
    }

    @PutMapping
    protected AjaxResult updateEntity(@RequestBody T t) {
        baseService.updateById(t);
        return AjaxResult.success(t);
    }

    @DeleteMapping("/{ids}")
    protected AjaxResult deleteEntity(@PathVariable("ids") String ids) {
        baseService.removeBatchByIds(Arrays.asList(ids.split(",")));
        return AjaxResult.success();
    }

    protected Page<T> getPageInfo(HttpServletRequest request) {
        String pageSize = request.getParameter("pageSize");
        String pageNum = request.getParameter("pageNum");
        long size = StringUtils.isEmpty(pageSize) ? 20 : Long.parseLong(pageSize);
        long num = StringUtils.isEmpty(pageNum) ? 1 : Long.parseLong(pageNum);
        return new Page<>(num, size);
    }

    protected <P> Page<P> getPageInfo(HttpServletRequest request, Class<P> clazz) {
        String pageSize = request.getParameter("pageSize");
        String pageNum = request.getParameter("pageNum");
        long size = StringUtils.isEmpty(pageSize) ? 20 : Long.parseLong(pageSize);
        long num = StringUtils.isEmpty(pageNum) ? 1 : Long.parseLong(pageNum);
        return new Page<>(num, size);
    }

}
