package com.cloud0072.apigrid.datasheet.service;

import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import com.cloud0072.apigrid.framework.domain.MenuNode;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.mongodb.core.query.Query;

import java.util.List;

public interface DatasheetService {

    Page<Datasheet> page(Query query, PageRequest page);

    List<Datasheet> findAll(Datasheet entity);

    Datasheet findByDstId(String dstId);

    Datasheet insert(Datasheet entity);

    Datasheet initDatasheet(MenuNode node);

    Datasheet updateByDstId(Datasheet entity);

    void deleteByDstIds(List<String> dstIds);
}
