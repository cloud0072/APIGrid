package com.cloud0072.apigrid.framework.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.cloud0072.apigrid.framework.domain.FileAsset;
import com.cloud0072.apigrid.framework.mapper.FileAssetMapper;
import com.cloud0072.apigrid.framework.service.FileAssetService;
import org.springframework.stereotype.Service;

@Service
public class FileAssetServiceImpl extends ServiceImpl<FileAssetMapper, FileAsset> implements FileAssetService {

}
