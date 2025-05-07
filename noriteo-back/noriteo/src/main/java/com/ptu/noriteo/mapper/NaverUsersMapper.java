package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Users;


public interface NaverUsersMapper {
    Users findByProviderId(String providerId);
    void insertNaverUser(Users users);
}
