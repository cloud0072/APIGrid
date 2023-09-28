package com.cloud0072.apigrid.datasheet.service.impl;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.cloud0072.apigrid.common.constant.Constants;
import com.cloud0072.apigrid.common.exception.BackendException;
import com.cloud0072.apigrid.common.util.IdUtils;
import com.cloud0072.apigrid.common.util.SecurityUtils;
import com.cloud0072.apigrid.datasheet.domain.*;
import com.cloud0072.apigrid.datasheet.repository.DatasheetRepository;
import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import com.cloud0072.apigrid.datasheet.service.RecordService;
import com.cloud0072.apigrid.datasheet.util.MongoPageHelper;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Example;
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
public class DatasheetServiceImpl implements DatasheetService {

    @Autowired
    private MongoPageHelper mongoPageHelper;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private DatasheetRepository datasheetRepository;

    @Autowired
    private RecordService recordService;

    @Override
    public Page<Datasheet> page(Query query, PageRequest page) {
        query.addCriteria(Criteria.where("is_deleted").is(0));
        return mongoPageHelper.pageQuery(query, page, Datasheet.class, "datasheet");
    }

    @Override
    public List<Datasheet> findAll(Datasheet entity) {
        entity.setIsDeleted(0);
        return datasheetRepository.findAll(Example.of(entity));
    }

    @Override
    public Datasheet findByDstId(String dstId) {
        var example = Example.of(Datasheet.builder().dstId(dstId).isDeleted(0).build());
        return datasheetRepository.findOne(example).orElseThrow(() -> new BackendException("未找到该datasheet"));
    }

    @Override
    public Datasheet insert(Datasheet entity) {
        entity.setIsDeleted(0);
        entity.setCreateTime(new Date());
        entity.setCreateBy(SecurityUtils.getUserId());
        entity.setUpdateTime(new Date());
        entity.setUpdateBy(SecurityUtils.getUserId());
        return datasheetRepository.insert(entity);
    }

    @Override
    public Datasheet updateByDstId(Datasheet entity) {
        var dst = findByDstId(entity.getDstId());
        entity.set_id(dst.get_id());
        entity.setUpdateTime(new Date());
        entity.setUpdateBy(SecurityUtils.getUserId());
        return datasheetRepository.save(entity);
    }

    @Override
    public void deleteByDstIds(List<String> dstIds) {
        dstIds.forEach(dstId -> mongoTemplate.dropCollection(Constants.DST_PREFIX + dstId));

        var query = new Query();
        query.addCriteria(Criteria.where("dstId").in(dstIds));
        var update = new Update().set("isDeleted", 1)
                .set("updateTime", new Date())
                .set("updateBy", SecurityUtils.getUserId());
        mongoTemplate.upsert(query, update, Datasheet.class);
    }

    @Override
    public Datasheet initDatasheet(MenuNode node) {
        var dstId = node.getNodeId();
        var nodeType = node.getNodeType();
        if (dstId == null) {
            throw new BackendException("表格Id不能为空！");
        }
        if (nodeType != 2) {
            throw new BackendException("节点类型必须为表格！");
        }
        var fields = Arrays.asList(
                new Field(IdUtils.getFieldId(), "标题", FieldType.TEXT.getType(), null).toJSONObject(),
                new Field(IdUtils.getFieldId(), "选项", FieldType.SELECT.getType(), null).toJSONObject(),
                new Field(IdUtils.getFieldId(), "附件", FieldType.FILE.getType(), null).toJSONObject()
        );
        var fieldMap = new HashMap<String, JSONObject>();
        fields.forEach(f -> fieldMap.put(f.getStr(Constants.ID), JSONUtil.parseObj(f)));

        var columns = fields.stream()
                .map(f -> new JSONObject().set(Constants.FIELD_ID, f.getStr(Constants.ID)))
                .collect(Collectors.toList());
        var view = View.builder()
                .id(IdUtils.getViewId())
                .name(Constants.DEFAULT_VIEW_NAME)
                .type(ViewType.Grid.getType())
                .frozenColumnCount(1)
                .rowHeightLevel(1)
                .columns(JSONUtil.parseArray(columns))
                .build().toJSONObject();
        var views = Collections.singletonList(view);
        var dst = Datasheet.builder()
                .dstId(dstId)
                .dstName(node.getNodeName())
                .fieldMap(fieldMap)
                .views(views)
                .build();
        insert(dst);

        var records = Arrays.asList(
                new Record(dstId).toJSONObject().set("标题", "1"),
                new Record(dstId).toJSONObject().set("标题", "2"),
                new Record(dstId).toJSONObject().set("标题", "3")
        );
        recordService.batchInsert(dstId, records, Constants.FIELD_NAME);
        return dst;
    }
}
