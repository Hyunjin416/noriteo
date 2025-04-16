package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UsersMapper {

    // 이메일로 사용자 조회
//    @Select("SELECT * FROM USERS WHERE user_email = #{userEmail}")
    Users findByEmail(@Param("userEmail") String userEmail);


    // ID로 사용자 조회 (리프레시 토큰 재발급 시 사용)
//    @Select("SELECT * FROM USERS WHERE user_id = #{userId}")
    Users findById(Long userId);

        // 사용자 등록
    void insertUsers(Users users);
}
