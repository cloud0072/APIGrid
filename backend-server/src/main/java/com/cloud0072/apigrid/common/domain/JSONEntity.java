package com.cloud0072.apigrid.common.domain;

import cn.hutool.json.JSONObject;
import cn.hutool.json.JSONUtil;

public interface JSONEntity {

    default JSONObject toJSONObject() {
        return JSONUtil.parseObj(this);
    }

}
