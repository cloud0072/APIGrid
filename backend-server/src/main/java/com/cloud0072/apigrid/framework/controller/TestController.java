package com.cloud0072.apigrid.framework.controller;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequestMapping("/api")
@RestController
public class TestController {

    @GetMapping("/test")
    public AjaxResult test1() {
        AjaxResult result = AjaxResult.success();
        result.put("data", "hello world");
        return result;
    }
}
