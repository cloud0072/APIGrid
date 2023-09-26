package com.cloud0072.apigrid;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import com.cloud0072.apigrid.datasheet.service.RecordService;
import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import lombok.var;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;
import java.util.Date;

@SpringBootTest
class RecordTests {

    private final String dstId = "dstgt7amupjgh";

    @Autowired
    private MongoTemplate mongoTemplate;

    @Autowired
    private RecordService recordService;

    @Autowired
    private DatasheetService datasheetService;

    @Test
    public void testAdd() {
        Datasheet datasheet = datasheetService.findByDstId(dstId);

        var jsonList = new ArrayList<JSONObject>();
        var json1 = new JSONObject();
        json1.set("dstId", dstId);
        json1.set("姓名", "张三");
        json1.set("年龄", "18");
        json1.set("学历", "本科");
        json1.set("入职日期", new Date());
        jsonList.add(json1);
        var json2 = new JSONObject();
        json2.set("dstId", dstId);
        json2.set("姓名", "李四");
        json2.set("年龄", "21");
        json2.set("学历", "本科");
        json2.set("入职日期", new Date());
        jsonList.add(json2);

        recordService.insertByFieldName(datasheet, jsonList);

//        var result = jsonList.stream()
//                .map(json -> transform(fieldConfigs, json))
//                .collect(Collectors.toList());
//
//        mongoTemplate.insert(result, getCollectionName());
    }

    @Test
    public void testList() {
        // [{"fld400khn6m":"张三","fldn6f0a1bj":"18638731263","fldzdcys2tg":"18","dstId":"dstgt7amupjgh","fldfjk2hhth":"本科","_id":{"timestamp":1695631263},"id":1706227300183445504,"recId":"recjlhk63rh"},{"fldch7tkj6z":"21","fld5sbhlges":"李四","fld978r2275":"18658196625","fldk5uy2f9b":"本科","dstId":"dstgt7amupjgh","_id":{"timestamp":1695631263},"id":1706227301030694912,"recId":"rec48l2a395"}]
        var result = mongoTemplate.findAll(JSONObject.class, getCollectionName());
        System.out.println(JSONUtil.toJsonStr(result));
    }

    @Test
    public void testPage() {
        var query = new Query();
        query.addCriteria(Criteria.where("fldn6f0a1bj").is("18638731263"));
        var result = recordService.page(dstId, query, PageRequest.of(1, 10));
        System.out.println(JSONUtil.toJsonStr(result));
    }

    private String getCollectionName() {
        return "datasheet_record";
    }


}
