package com.cloud0072.apigrid.datasheet.service.impl;

import cn.hutool.json.JSONObject;
import com.cloud0072.apigrid.common.constant.Constants;
import com.cloud0072.apigrid.common.exception.BackendException;
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
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
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
    public Page<JSONObject> page(String dstId, Query query, PageRequest page) {
        return mongoPageHelper.pageQuery(query, page, JSONObject.class, dstId);
    }

    @Override
    public List<JSONObject> list(String dstId, JSONObject entity, String type) {
        if (Constants.FIELD_NAME.equals(type)) {
//            var dstId = entity.getStr("dstId");
//            var dst = datasheetService.findByDstId(dstId);
//            var query = new Query();
//            var target = transform(dst.getFields(), entity);
//            return mongoTemplate.find(query, JSONObject.class, getCollectionName(dstId));
        }
        return new ArrayList<>();
    }

    @Override
    public JSONObject findById(String dstId, String id) {
        var query = new Query();
        query.addCriteria(Criteria.where("_id").is(id));
        query.addCriteria(Criteria.where("is_deleted").is(0));
        return mongoTemplate.findOne(query, JSONObject.class, getCollectionName(dstId));
    }

    @Override
    public JSONObject updateById(String dstId, JSONObject entity) {
        if (entity.getLong(Constants._ID) != null) {
            return mongoTemplate.save(entity, getCollectionName(dstId));
        } else {
            throw new BackendException("必须传入_Id字段");
        }
    }

    @Override
    public void deleteByIds(String dstId, List<String> ids) {
        var query = new Query(Criteria.where(Constants.ID).in(ids));
        mongoTemplate.remove(query, getCollectionName(dstId));
    }

    @Override
    public List<JSONObject> insert(String dstId, List<JSONObject> jsonList, String type) {
        var dst = datasheetService.findByDstId(dstId);
        if (Constants.FIELD_NAME.equals(type)) {
            return insertByFieldName(dst, jsonList);
        } else if (Constants.FIELD_ID.equals(type)) {
            return insertByFieldId(dst, jsonList);
        }
        return new ArrayList<>();
    }

    @Override
    public List<JSONObject> insertByFieldName(Datasheet dst, List<JSONObject> jsonList) {
        var fields = dst.getFieldMap();
        var result = jsonList.stream()
                .map(json -> transform(fields, json))
                .collect(Collectors.toList());
        return new ArrayList<>(mongoTemplate.insert(result, getCollectionName(dst.getDstId())));
    }

    @Override
    public List<JSONObject> insertByFieldId(Datasheet dst, List<JSONObject> jsonList) {
        var fields = dst.getFieldMap();
        var result = jsonList.stream()
                .map(json -> checkFields(fields, json))
                .collect(Collectors.toList());
        return new ArrayList<>(mongoTemplate.insert(result, getCollectionName(dst.getDstId())));
    }

    private JSONObject checkFields(JSONObject fieldMap, JSONObject json) {
        json.keySet().forEach(key -> {
            if (!fieldMap.containsKey(key) && !ConstNames.contains(key)) {
                json.remove(key);
            }
        });
        return json;
    }

    private JSONObject transform(JSONObject fieldMap, JSONObject json) {
        var result = new JSONObject();
        json.keySet().forEach(name -> {
            var fieldOpt = fieldMap.values().stream()
                    .map(f -> (JSONObject) f)
                    .filter(f -> name.equals(f.getStr(Constants.NAME)))
                    .findFirst();
            if (fieldOpt.isPresent()) {
                result.set(fieldOpt.get().getStr(Constants.ID), json.getObj(name));
            } else if (ConstNames.contains(name)) {
                result.set(name, json.getObj(name));
            }
        });
        return result;
    }

//    private JSONObject initRecordValue(String dstId, JSONObject json) {
//        if (json.getStr(Constants.DST_ID) == null) {
//            json.set(Constants.DST_ID, dstId);
//        }
//        json.set(Constants.REC_ID, IdUtils.getRecordId())
//                .set(Constants.IS_DELETED, 0)
//                .set(Constants.CREATE_TIME, new Date())
//                .set(Constants.UPDATE_TIME, new Date())
//                .set(Constants.CREATE_BY, SecurityUtils.getUserId())
//                .set(Constants.UPDATE_BY, SecurityUtils.getUserId());
//        return json;
//    }

    private String getCollectionName(String dstId) {
        return Constants.DST_PREFIX + dstId;
    }
}
