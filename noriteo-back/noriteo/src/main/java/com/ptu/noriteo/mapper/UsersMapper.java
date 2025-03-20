package com.ptu.noriteo.mapper;

import com.ptu.noriteo.model.Users;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface UsersMapper {
    //    @Select("SELECT * FROM USERS WHERE user_email = #{userEmail}")
    Users findByEmail(String userEmail);

    void insertUsers(Users users);
}