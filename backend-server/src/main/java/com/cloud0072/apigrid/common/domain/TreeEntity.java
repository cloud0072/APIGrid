package com.cloud0072.apigrid.common.domain;

import java.io.Serializable;

public interface TreeEntity {

    Serializable getKey();

    Serializable getParentId();

    String getTitle();

}
