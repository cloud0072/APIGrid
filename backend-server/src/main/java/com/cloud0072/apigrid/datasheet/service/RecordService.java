package com.cloud0072.apigrid.datasheet.service;

import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface RecordService {

    Page<JSONObject> page(String dstId, Query query, PageRequest page);

    List<JSONObject> list(String dstId, JSONObject entity, String type);

    JSONObject findById(String dstId, String id);

    JSONObject updateById(String dstId, JSONObject entity);

    void deleteByIds(String dstId, List<String> ids);

    List<JSONObject> insert(String dstId, List<JSONObject> jsonList, String type);

    /**
     * 根据fieldName插入数据
     */
    List<JSONObject> insertByFieldName(Datasheet dst, List<JSONObject> data);

    /**
     * 根据fieldId插入数据
     *
     * @param data
     * @return
     */
    List<JSONObject> insertByFieldId(Datasheet dst, List<JSONObject> data);

}
