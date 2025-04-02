package com.ptu.noriteo.config;

import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.mapper.UsersMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UsersMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String userEmail) throws UsernameNotFoundException {
        log.info("Load User By UserEmail : " + userEmail);

        // 사용자 조회 (이메일 기준)
        Users users = mapper.findByEmail(userEmail);
        log.info("User queried by UsersMapper: " + users);

        // 사용자 정보가 없을 경우 예외 발생
        if (users == null) {
            log.error("User not found: " + userEmail);
            throw new UsernameNotFoundException("User not found: " + userEmail);
        }

        return new CustomUser(users);
    }
}
