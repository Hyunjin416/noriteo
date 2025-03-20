package com.ptu.noriteo.service;

import com.ptu.noriteo.mapper.UsersMapper;
import com.ptu.noriteo.model.Users;
import org.springframework.stereotype.Service;

@Service
public class UsersService {
    private final UsersMapper usersMapper;

    public UsersService(UsersMapper usersMapper) {
        this.usersMapper = usersMapper;
    }

    public Users findByEmail(String email) {
        return usersMapper.findByEmail(email);
    }

    public void registerUsers(Users users) {
        if (users.getRoleId() == null) {
            users.setRoleId(2L); // 기본값으로 일반 사용자 역할 ID(예: 2) 설정
        }
        usersMapper.insertUsers(users);
    }


}
