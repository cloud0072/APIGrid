package com.cloud0072.apigrid.datasheet.util;

import com.cloud0072.apigrid.common.constant.Constants;
import lombok.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.data.domain.Sort.Direction;
import org.springframework.data.domain.Sort.Order;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.function.Function;
import java.util.stream.Collectors;

import static com.cloud0072.apigrid.datasheet.util.QueryUtils.FIRST_PAGE_NUM;

@Component
public class MongoPageHelper {

    @Autowired
    private MongoTemplate mongoTemplate;

    public <T> Page<T> pageQuery(Query query, PageRequest page, Class<T> entityClass, String collectionName) {
        return pageQuery(query, page, entityClass, collectionName, Function.identity());
    }

    public <T, R> Page<R> pageQuery(Query query, PageRequest page, Class<T> entityClass, String collectionName, Function<T, R> mapper) {
        var pageSize = page.getPageSize();
        var pageNum = page.getPageNumber();
        var sort = page.getSort();
        //分页逻辑
        var total = mongoTemplate.count(query, collectionName);
        var pages = (int) Math.ceil(total / (double) pageSize);
        if (pageNum <= 0 || pageNum > pages) {
            pageNum = FIRST_PAGE_NUM;
        }
        //排序如果为空则添加基础排序
        var pageSort = !sort.isEmpty() ? sort :
                Sort.by(Collections.singletonList(new Order(Direction.ASC, Constants.ID)));
        query = query.addCriteria(Criteria.where("isDeleted").is(0)).with(pageSort);
        var skip = pageSize * (pageNum - 1);
        query.skip(skip).limit(pageSize);

        var entityList = mongoTemplate.find(query, entityClass, collectionName);

        return new PageImpl<>(entityList.stream().map(mapper).collect(Collectors.toList()),
                PageRequest.of(pageNum, pageSize), total);
    }

}
