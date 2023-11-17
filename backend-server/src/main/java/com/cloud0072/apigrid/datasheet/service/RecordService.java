package com.cloud0072.apigrid.datasheet.service;

import cn.hutool.json.JSONObject;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface RecordService {

    Page<JSONObject> page(String dstId, Query query, PageRequest page, String type);

    List<JSONObject> list(String dstId, Query query, String type);

    JSONObject findByRecId(String dstId, String recId, String type);

    List<JSONObject> batchInsert(String dstId, List<JSONObject> jsonList, String type);

    List<JSONObject> batchUpdate(String dstId, List<JSONObject> jsonList, String type);

    void deleteByRecIds(String dstId, List<String> ids);

}
