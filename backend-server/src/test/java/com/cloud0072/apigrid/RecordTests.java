package com.cloud0072.apigrid;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.cloud0072.apigrid.common.constant.Constants;
import com.cloud0072.apigrid.datasheet.service.RecordService;
import lombok.var;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.ArrayList;

@SpringBootTest
class RecordTests {

    private final String dstId = "dst1tjzxzsh68";

    @Autowired
    private RecordService recordService;

    @Test
    public void testAdd() {

        var jsonList = new ArrayList<JSONObject>();
        var json1 = new JSONObject();
        json1.set("dstId", dstId);
        json1.set("标题", "张三");
        json1.set("选项", "18");
        jsonList.add(json1);
        var json2 = new JSONObject();
        json2.set("dstId", dstId);
        json2.set("标题", "李四");
        json2.set("选项", "21");
        jsonList.add(json2);

        recordService.batchInsert(dstId, jsonList, Constants.FIELD_NAME);

    }

    @Test
    public void testList() {
        var result = recordService.list(dstId, null, Constants.FIELD_NAME);
        System.out.println(JSONUtil.toJsonStr(result));
    }

    @Test
    public void testPage() {
        var query = new Query();
        query.addCriteria(Criteria.where("fldn6f0a1bj").is("18638731263"));
        var result = recordService.page(dstId, query, PageRequest.of(1, 10), Constants.FIELD_ID);
        System.out.println(JSONUtil.toJsonStr(result));
    }

}
