package com.cloud0072.apigrid.datasheet.controller;

import com.cloud0072.apigrid.common.domain.AjaxResult;
import com.cloud0072.apigrid.common.util.JSONUtils;
import com.cloud0072.apigrid.datasheet.domain.Datasheet;
import com.cloud0072.apigrid.datasheet.repository.DatasheetRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequestMapping("/datasheet")
@RestController
public class DatasheetController {

    @Autowired
    private DatasheetRepository datasheetRepository;

    @GetMapping("/list")
    public AjaxResult list() {
        List<Datasheet> result = datasheetRepository.findAll();
        return AjaxResult.success(result);
    }

    @PostMapping
    public AjaxResult add(@RequestBody Datasheet datasheet) {
        Datasheet result = datasheetRepository.insert(datasheet);
        return AjaxResult.success(result);
    }

    @PatchMapping
    public AjaxResult update(@RequestBody Datasheet datasheet) {
        Datasheet result = datasheetRepository.save(datasheet);
        return AjaxResult.success(result);
    }

}
