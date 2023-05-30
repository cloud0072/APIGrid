package com.cloud0072.apigrid.framework.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.cloud0072.apigrid.framework.domain.User;
import org.apache.ibatis.annotations.Param;

public interface UserMapper extends BaseMapper<User> {

    User selectUserByUsername(@Param("username") String username);

    User selectUserByMobile(@Param("mobile") String mobile);

}
