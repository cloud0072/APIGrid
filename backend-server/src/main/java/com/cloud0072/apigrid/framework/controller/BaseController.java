package com.cloud0072.apigrid.framework.controller;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.StringUtils;
import com.cloud0072.apigrid.framework.service.BaseService;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import java.io.Serializable;
import java.util.List;

public abstract class BaseController<T, ID extends Serializable> {

    abstract BaseService<T, ID> getService();

    @PostMapping
    protected T insertEntity(T t) {
        getService().insertEntity(t);
        return t;
    }

    @DeleteMapping
    protected AjaxResult deleteEntity(ID id) {
        int result = getService().deleteEntity(id);
        return AjaxResult.success();
    }

    @PutMapping
    protected AjaxResult updateEntity(T t) {
        getService().updateEntity(t);
        return AjaxResult.success(t);
    }

    @GetMapping("/{id}")
    protected AjaxResult selectEntityById(@PathVariable("id") ID id) {
        return AjaxResult.success(getService().selectEntityById(id));
    }

    @GetMapping("/list")
    protected AjaxResult selectEntityList(T t) {
        QueryWrapper<T> wrapper = new QueryWrapper<>(t);
        return AjaxResult.success(getService().selectEntityList(wrapper));
    }

    @GetMapping("/page")
    protected AjaxResult selectEntityPage(T t, HttpServletRequest request) {
        Page<T> page = getPageInfo(request);
        QueryWrapper<T> wrapper = new QueryWrapper<>(t);
        return AjaxResult.success(getService().selectEntityPage(page, wrapper));
    }

    private Page<T> getPageInfo(HttpServletRequest request) {
        String pageSize = request.getParameter("pageSize");
        String pageNum = request.getParameter("pageNum");
        long size = StringUtils.isEmpty(pageSize) ? 20 : Long.parseLong(pageSize);
        long num = StringUtils.isEmpty(pageNum) ? 1 : Long.parseLong(pageNum);
        return new Page<>(num, size);
    }

}
