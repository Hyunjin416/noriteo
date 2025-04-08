package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Users;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface KakaoUsersMapper {

    // 이메일로 유저 찾기 (중복 체크)
    Users findByProviderId(String providerId);

    // 카카오 유저 등록
    void insertKakaoUser(Users user);
}
