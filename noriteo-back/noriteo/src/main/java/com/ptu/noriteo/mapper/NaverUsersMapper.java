package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Users;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface NaverUsersMapper {
    Users findByProviderId(String providerId);
    void insertNaverUser(Users users);
}
