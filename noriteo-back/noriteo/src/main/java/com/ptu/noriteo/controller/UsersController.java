package com.ptu.noriteo.controller;

import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.service.UsersService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/member")
public class UsersController {

    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping(value = "/signUp", consumes = "multipart/form-data")
    public ResponseEntity<?> registerUsers(
            @RequestPart("user") Users users,
            @RequestPart(value = "profileImage", required = false) MultipartFile profileImage) {

        // 이메일 중복 확인
        if (usersService.findByEmail(users.getUserEmail()) != null) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }

        // 프로필 이미지 처리
        if (profileImage != null && !profileImage.isEmpty()) {
            String fileName = profileImage.getOriginalFilename();
            users.setOriginUser(fileName);
            users.setSysUser("saved_" + fileName);
        }

        usersService.registerUsers(users);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        String userEmail = loginData.get("userEmail");
        String password = loginData.get("password");

        try {
            // 로그인 및 토큰 발급
            Map<String, String> tokens = usersService.loginUser(userEmail, password);
            String accessToken = tokens.get("normalAccessToken");
            String refreshToken = tokens.get("normalRefreshToken");

            // Access Token 설정
            ResponseCookie accessTokenCookie = ResponseCookie.from("normalAccessToken", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 30)
                    .sameSite("Lax")
                    .build();

            // Refresh Token 설정
            ResponseCookie refreshTokenCookie = ResponseCookie.from("normalRefreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 60 * 24 * 7)
                    .sameSite("Lax")
                    .build();

            // 응답 헤더에 쿠키 추가
            response.addHeader("Set-Cookie", accessTokenCookie.toString());
            response.addHeader("Set-Cookie", refreshTokenCookie.toString());

            return ResponseEntity.ok("로그인 성공");
        } catch (IllegalArgumentException e) {
            log.error("로그인 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body("로그인 실패: " + e.getMessage());
        }
    }

}
