package com.cloud0072.apigrid.datasheet.util;

import cn.hutool.json.JSONArray;
import com.cloud0072.apigrid.datasheet.vo.DatasheetQuery;
import com.cloud0072.apigrid.datasheet.vo.FilterItem;
import lombok.var;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;

public class QueryUtils {

    public static final int FIRST_PAGE_NUM = 1;
    public static final int DEFAULT_PAGE_SIZE = 20;

    public static Query getQuery(DatasheetQuery query) {
        var params = query.getParams();
        if (params == null || params.isEmpty()) {
            return new Query();
        }
        Criteria criteria = null;
        for (FilterItem item : params) {
            var rel = item.getRel();
            if (criteria == null) {
                criteria = getCriteria(item);
                continue;
            }
            if ("and".equals(rel)) {
                criteria.andOperator(getCriteria(item));
            } else {
                criteria.orOperator(getCriteria(item));
            }
        }
        return new Query().addCriteria(criteria);
    }

    private static Criteria getCriteria(FilterItem item) {
        var fieldId = item.getFieldId();
        var symbol = item.getSymbol();
        var value = item.getValue();
        switch (symbol) {
            case "is":
                // 等于
                return Criteria.where(fieldId).is(value);
            case "gt":
                // 大于
                return Criteria.where(fieldId).gt(value);
            case "gte":
                // 大于等于
                return Criteria.where(fieldId).gte(value);
            case "lt":
                // 小于
                return Criteria.where(fieldId).lt(value);
            case "lte":
                // 小于等于
                return Criteria.where(fieldId).lte(value);
            case "eq":
                // db.t_dstaryxcnjr.find({"fldxvvr5ega": ["optsf4fjubg","optuz0t34cv"]})
                // 全等于 查询数组时，判断相等必须使用中括号包住，然后匹配
                return Criteria.where(fieldId).is(value.toString().split(","));
            case "all":
                // 包含 all 忽略数组中的顺序,
                return Criteria.where(fieldId).all(value.toString().split(","));
            case "like":
                // 模糊查询文本
                return Criteria.where(fieldId).regex(value.toString());
            case "isNull":
                return Criteria.where(fieldId).is(null);
            case "isNotNull":
                return Criteria.where(fieldId).ne(null);
            default:
                // 查询全部
                return Criteria.where("_id").ne(null);
        }
    }

    public static PageRequest getPageInfo(DatasheetQuery query) {
        var pageSize = query.getPageSize();
        var pageNum = query.getPageNum();
        int size = isValidNum(pageSize) ? pageSize : DEFAULT_PAGE_SIZE;
        int num = isValidNum(pageNum) ? pageNum : FIRST_PAGE_NUM;
        return PageRequest.of(num, size);
    }

    private static boolean isValidNum(Integer num) {
        return num != null && num >= 0;
    }

}
