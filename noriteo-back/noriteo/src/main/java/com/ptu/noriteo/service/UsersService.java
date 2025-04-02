package com.ptu.noriteo.service;

import com.ptu.noriteo.jwt.JwtUtil;
import com.ptu.noriteo.mapper.UsersMapper;
import com.ptu.noriteo.model.Users;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.Map;



@Service
@RequiredArgsConstructor
@Slf4j
public class UsersService {

    private final UsersMapper usersMapper;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;

    // 이메일로 유저 찾기
    public Users findByEmail(String email) {
        log.info("🔍 이메일로 유저 찾기: {}", email);
        return usersMapper.findByEmail(email);
    }

    // 회원가입 (비밀번호 암호화)
    public void registerUsers(Users users) {
        if (users.getRoleId() == null) {
            users.setRoleId(2L); // 기본값으로 일반 사용자 역할 ID(2) 설정
        }

        // 🔒 비밀번호 암호화 (평문 비밀번호를 암호화하여 저장)
        String encodedPassword = passwordEncoder.encode(users.getPassword());
        users.setPassword(encodedPassword);
        log.info("🔒 암호화된 비밀번호: {}", encodedPassword);

        usersMapper.insertUsers(users);
    }

    // 로그인 및 토큰 발급
    public Map<String, String> loginUser(String userEmail, String password) {
        Users users = usersMapper.findByEmail(userEmail);

        if (users == null) {
            log.error("❌ 유저 정보 없음: {}", userEmail);
            throw new IllegalArgumentException("Invalid email or password.");
        }

        // 암호화된 비밀번호 비교 (BCryptPasswordEncoder 사용)
        boolean isPasswordMatch = passwordEncoder.matches(password, users.getPassword());
        log.info("🔑 비밀번호 비교 결과: {}", isPasswordMatch);

        if (!isPasswordMatch) {
            log.error("❌ 비밀번호 불일치");
            throw new IllegalArgumentException("Invalid email or password.");
        }

        // 토큰 생성
        String accessToken = jwtUtil.generateNormalAccessToken(users.getUserId(), users.getUserEmail(), "USER");
        String refreshToken = jwtUtil.generateNormalRefreshToken(users.getUserId());

        // 토큰 맵 생성
        Map<String, String> tokens = new HashMap<>();
        tokens.put("normalAccessToken", accessToken);
        tokens.put("normalRefreshToken", refreshToken);
        return tokens;
    }

//    @PostConstruct
//    public void printTestPassword() {
//        String rawPassword = "admin01";
//        String encodedPassword = passwordEncoder.encode(rawPassword);
//        log.info("🔑 암호화된 테스트 비밀번호: {}", encodedPassword);
//    }
}


