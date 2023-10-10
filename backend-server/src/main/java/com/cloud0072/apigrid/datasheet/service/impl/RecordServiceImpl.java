package com.cloud0072.apigrid.datasheet.service.impl;

import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.constant.Constants;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import com.cloud0072.apigrid.datasheet.service.RecordService;
import com.cloud0072.apigrid.datasheet.util.MongoPageHelper;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.*;
import java.util.stream.Collectors;

@Service
public class RecordServiceImpl implements RecordService {

    private final static List<String> ConstNames = Arrays.asList(Constants._ID, Constants.REC_ID, Constants.DST_ID, Constants.IS_DELETED, Constants.CREATE_BY, Constants.CREATE_TIME, Constants.UPDATE_BY, Constants.UPDATE_TIME);

    @Autowired
    private MongoPageHelper mongoPageHelper;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private DatasheetService datasheetService;

    @Override
    public Page<JSONObject> page(String dstId, Query query, PageRequest page, String type) {
        return mongoPageHelper.pageQuery(query, page, JSONObject.class, dstId);
    }

    @Override
    public List<JSONObject> list(String dstId, JSONObject entity, String type) {
        var dst = datasheetService.findByDstId(dstId);
        var query = new Query();
        var result = mongoTemplate.find(query, JSONObject.class, getCollectionName(dstId));
        if (Constants.FIELD_NAME.equals(type)) {
            return result.stream().map(json -> transformToName(dst, json)).collect(Collectors.toList());
        } else {
            return result;
        }
    }

    @Override
    public JSONObject findByRecId(String dstId, String recId, String type) {
        var query = new Query();
        query.addCriteria(Criteria.where("recId").is(recId));
        query.addCriteria(Criteria.where("isDeleted").is(0));
        var record = mongoTemplate.findOne(query, JSONObject.class, getCollectionName(dstId));
        if (record == null) {
            return null;
        }
        if (Constants.FIELD_NAME.equals(type)) {
            var dst = datasheetService.findByDstId(dstId);
            return transformToName(dst, record);
        } else {
            return record;
        }
    }

    @Override
    public void deleteByRecIds(String dstId, List<String> recIds) {
        var query = new Query();
        query.addCriteria(Criteria.where("recId").in(recIds));
        var update = new Update().set("isDeleted", 1)
                .set("updateTime", new Date())
                .set("updateBy", SecurityUtils.getUserId());
        mongoTemplate.upsert(query, update, Datasheet.class);
    }

    @Override
    public List<JSONObject> batchInsert(String dstId, List<JSONObject> jsonList, String type) {
        var dst = datasheetService.findByDstId(dstId);
        var result = jsonList.stream()
                .map(json -> transformToId(dst, json))
                .map(this::setCreateInfo)
                .collect(Collectors.toList());
        return new ArrayList<>(mongoTemplate.insert(result, getCollectionName(dst.getDstId())));
    }

    @Override
    public List<JSONObject> batchUpdate(String dstId, List<JSONObject> jsonList, String type) {
        var dst = datasheetService.findByDstId(dstId);
        var updateRecIds = jsonList.stream().map(j -> j.getStr("recId")).collect(Collectors.toList());
        var query = new Query();
        query.addCriteria(Criteria.where("recId").in(updateRecIds));
        query.addCriteria(Criteria.where("isDeleted").is(0));
        var pervs = mongoTemplate.find(query, JSONObject.class, getCollectionName(dst.getDstId()))
                .stream().collect(Collectors.toMap(j -> j.getStr("recId"), j -> j));
        var result = new ArrayList<JSONObject>();
        jsonList.stream()
                // 转化行
                .map(json -> "fieldId".equals(type) ? json : transformToId(dst, json))
                // 合并值
                .map(json -> mergeFields(pervs, json))
                // TODO: 公式字段
//                .map(json -> calcFormula(dst, json))
                .filter(Objects::nonNull)
                .map(this::setUpdateInfo)
                .forEach(json -> {
                    result.add(json);
                    mongoTemplate.save(json, getCollectionName(dst.getDstId()));
                });
        return result;
    }

    private JSONObject setCreateInfo(JSONObject json) {
        json.set(Constants.CREATE_BY, SecurityUtils.getUserId().toString());
        json.set(Constants.CREATE_TIME, new Date());
        return json;
    }

    private JSONObject setUpdateInfo(JSONObject json) {
        json.set(Constants.UPDATE_BY, SecurityUtils.getUserId().toString());
        json.set(Constants.UPDATE_TIME, new Date());
        return json;
    }

    private JSONObject mergeFields(Map<String, JSONObject> pervs, JSONObject json) {
        var perv = pervs.get(json.getStr("recId"));
        if (perv == null) {
            return null;
        }
        json.keySet().stream()
                .filter(key -> key.startsWith("fld"))
                .forEach(key -> perv.set(key, json.get(key)));
        return perv;
    }

    private JSONObject transformToId(Datasheet dst, JSONObject json) {
        var fMap = dst.getFieldMap();
        fMap.putAll(dst.getFieldNameMap());
        var result = new JSONObject();
        json.keySet().forEach(key -> {
            var f = fMap.get(key);
            if (f != null) {
                result.set(f.getStr(Constants.ID), json.getObj(key));
            } else if (ConstNames.contains(key)) {
                var value = json.getObj(key);
                result.set(key, value instanceof Long ? value.toString() : value);
            }
        });
        return result;
    }

    private JSONObject transformToName(Datasheet dst, JSONObject json) {
        var fMap = dst.getFieldMap();
        fMap.putAll(dst.getFieldNameMap());
        var result = new JSONObject();
        json.keySet().forEach(key -> {
            var f = fMap.get(key);
            if (f != null) {
                result.set(f.getStr(Constants.NAME), json.getObj(key));
            } else if (ConstNames.contains(key)) {
                var value = json.getObj(key);
                result.set(key, value instanceof Long ? value.toString() : value);
            }
        });
        return result;
    }

    private String getCollectionName(String dstId) {
        return Constants.DST_PREFIX + dstId;
    }

}
