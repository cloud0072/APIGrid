package com.cloud0072.apigrid.datasheet.repository;

import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DatasheetRepository extends MongoRepository<Datasheet, String> {
}
