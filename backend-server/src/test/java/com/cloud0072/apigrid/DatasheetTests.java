package com.cloud0072.apigrid;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.cloud0072.apigrid.common.constant.Constants;
import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import com.cloud0072.apigrid.datasheet.domain.Field;
import com.cloud0072.apigrid.datasheet.domain.FieldType;
import com.cloud0072.apigrid.datasheet.service.DatasheetService;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import com.cloud0072.apigrid.framework.service.MenuNodeService;
import lombok.var;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

import java.util.Arrays;

@SpringBootTest
class DatasheetTests {

    @Autowired
    private DatasheetService datasheetService;

    @Autowired
    private MenuNodeService menuNodeService;

    @Autowired
    private MongoTemplate mongoTemplate;

    @Test
    public void clear() {
        mongoTemplate.dropCollection("datasheet");
        var nodes = menuNodeService.list(new QueryWrapper<MenuNode>().eq("node_type", 2));
        for (MenuNode node : nodes) {
            mongoTemplate.dropCollection(Constants.DST_PREFIX + node.getNodeId());
        }
    }

    @Test
    public void testAdd() {
        var all = datasheetService.findAll(new Datasheet());
        if (all.size() < 1) {
            var nodes = menuNodeService.list(new QueryWrapper<MenuNode>().eq("node_type", 2));
            for (MenuNode menuNode : nodes) {
                datasheetService.initDatasheet(menuNode);
            }
        }
    }

    @Test
    public void testUpdate1() {
        var datasheet = datasheetService.findByDstId("dstd6r7p32sjx");
        var fields = Arrays.asList(
                new Field("fldjmjuv9c6", "姓名", FieldType.TEXT.getType(), null).toJSONObject(),
                new Field("fldgxp9fj7g", "年龄", FieldType.NUMBER.getType(), null).toJSONObject(),
                new Field("fld28m4jebh", "学历", FieldType.TEXT.getType(), null).toJSONObject(),
                new Field("fldjpyp9ct2", "入职日期", FieldType.DATETIME.getType(), null).toJSONObject()
        );
        var fieldMap = new JSONObject();
        fields.forEach(f -> fieldMap.set(f.getStr("id"), JSONUtil.parseObj(f)));

        datasheet.setFieldMap(fieldMap);
        datasheetService.updateById(datasheet);
    }

    @Test
    public void testUpdate2() {
        var datasheet = datasheetService.findByDstId("dstd6r7p32sjx");
        var fields = Arrays.asList(
                new Field("fldjmjuv9c6", "姓名", FieldType.TEXT.getType(), null).toJSONObject(),
                new Field("fldgxp9fj7g", "年龄", FieldType.NUMBER.getType(), null).toJSONObject(),
                new Field("fld28m4jebh", "学历", FieldType.TEXT.getType(), null).toJSONObject(),
                new Field("fldjpyp9ct2", "入职日期", FieldType.DATETIME.getType(), null).toJSONObject()
        );
        var fieldMap = new JSONObject();
        fields.forEach(f -> fieldMap.set(f.getStr("id"), JSONUtil.parseObj(f)));

        datasheet.setFieldMap(fieldMap);
        datasheetService.updateById(datasheet);
    }

    @Test
    public void testList() {
        var result = datasheetService.findAll(new Datasheet());
        System.out.println(JSONUtil.toJsonStr(result));
    }

    @Test
    public void testPage() {
        var query = new Query();
        query.addCriteria(Criteria.where("dstName").regex("(.*)1[\\d]+"));
//        query.addCriteria(Criteria.where("dstId"))
        var result = datasheetService.page(query, PageRequest.of(1, 10));
        System.out.println(JSONUtil.toJsonStr(result));
    }


}
