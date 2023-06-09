package com.cloud0072.apigrid.framework.service;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;

import java.io.Serializable;
import java.util.List;

public interface BaseService<T, ID extends Serializable> {

    BaseMapper<T> getMapper();

    default T insertEntity(T t) {
        getMapper().insert(t);
        return t;
    }

    default int deleteEntity(ID id) {
        return getMapper().deleteById(id);
    }

    default T updateEntity(T t) {
        getMapper().updateById(t);
        return t;
    }

    default List<T> selectEntityList(QueryWrapper<T> wrapper) {
        return getMapper().selectList(wrapper);
    }

    default Page<T> selectEntityPage(Page<T> page, QueryWrapper<T> wrapper) {
        return getMapper().selectPage(page, wrapper);
    }

    default T selectEntity(QueryWrapper<T> wrapper) {
        return getMapper().selectOne(wrapper);
    }

    default T selectEntityById(ID id) {
        return getMapper().selectById(id);
    }

}
