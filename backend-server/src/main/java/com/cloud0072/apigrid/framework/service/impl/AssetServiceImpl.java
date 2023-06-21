package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.framework.domain.Asset;
import com.cloud0072.apigrid.framework.mapper.AssetMapper;
import com.cloud0072.apigrid.framework.service.AssetService;
import org.springframework.stereotype.Service;

@Service
public class AssetServiceImpl extends ServiceImpl<AssetMapper, Asset> implements AssetService {

}
