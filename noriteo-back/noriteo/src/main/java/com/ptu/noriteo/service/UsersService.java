package com.ptu.noriteo.service;

import com.ptu.noriteo.config.FileUploadService;
import com.ptu.noriteo.jwt.JwtUtil;
import com.ptu.noriteo.mapper.UsersMapper;
import com.ptu.noriteo.model.Users;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;



@Service
@RequiredArgsConstructor
@Slf4j
public class UsersService {

    private final UsersMapper usersMapper;
    private final JwtUtil jwtUtil;
    private final BCryptPasswordEncoder passwordEncoder;
    private final FileUploadService fileUploadService; // 파일 저장 유틸

    // 이메일로 유저 찾기
    public Users findByEmail(String email) {
        log.info("이메일로 유저 찾기: {}", email);
        return usersMapper.findByEmail(email);
    }

    // 회원가입 (비밀번호 암호화)
    public void registerUsers(Users users, MultipartFile profileImage) {
        if (users.getRoleId() == null) {
            users.setRoleId(2L); // 기본 사용자
        }

        // 비밀번호 암호화
        String encodedPassword = passwordEncoder.encode(users.getPassword());
        users.setPassword(encodedPassword);

        // 🔽 프로필 이미지 저장 처리
        if (profileImage != null && !profileImage.isEmpty()) {
            String originName = profileImage.getOriginalFilename();
            String savedPath = fileUploadService.upload("users", profileImage); // "users" 폴더에 저장

            users.setOriginUser(originName);
            users.setSysUser(savedPath); // 저장된 URL 경로
        }

        usersMapper.insertUsers(users);
    }


    // 로그인 및 토큰 발급
    public Map<String, String> loginUser(String userEmail, String password) {
        Users users = usersMapper.findByEmail(userEmail);

        /*if (users == null) {
            log.error("유저 정보 없음: {}", userEmail);
            throw new IllegalArgumentException("Invalid email or password.");
        }*/

        if (users == null || !passwordEncoder.matches(password, users.getPassword())) {
            throw new IllegalArgumentException("로그인 정보 불일치");
        }


        // ROLE_ID → 문자열 ROLE_NAME 매핑
        String roleName = switch (users.getRoleId().intValue()) {
            case 1 -> "ADMIN";
            case 2 -> "USER";
            default -> throw new RuntimeException("알 수 없는 ROLE_ID: " + users.getRoleId());
        };

        // JWT 생성
        String accessToken = jwtUtil.generateNormalAccessToken(
                users.getUserId(), users.getUserEmail(), roleName);
        String refreshToken = jwtUtil.generateNormalRefreshToken(
                users.getUserId(), roleName);

        // 반환
        Map<String,String> tokens = new HashMap<>();
        tokens.put("normalAccessToken", accessToken);
        tokens.put("normalRefreshToken", refreshToken);
        return tokens;

        /*
        // 암호화된 비밀번호 비교 (BCryptPasswordEncoder 사용)
        boolean isPasswordMatch = passwordEncoder.matches(password, users.getPassword());
        log.info("비밀번호 비교 결과: {}", isPasswordMatch);

        if (!isPasswordMatch) {
            log.error("비밀번호 불일치");
            throw new IllegalArgumentException("Invalid email or password.");
        }


        // 토큰 생성
        String roleName = usersMapper.getRoleNameById(users.getRoleId()); // DB에서 가져옴
        String normalAccessToken = jwtUtil.generateNormalAccessToken(users.getUserId(), users.getUserEmail(), roleName);
        String normalRefreshToken = jwtUtil.generateNormalRefreshToken(users.getUserId(), roleName);


        // 토큰 맵 생성q
        Map<String, String> tokens = new HashMap<>();
        tokens.put("normalAccessToken", normalAccessToken);
        tokens.put("normalRefreshToken", normalRefreshToken);
        return tokens;
        */
    }

    public Users findById(Long userId) {
        return usersMapper.findById(userId);
    }


}


