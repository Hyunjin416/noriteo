package com.ptu.noriteo.controller;

import com.ptu.noriteo.service.KakaoUsersService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/kakao")
public class KakaoUsersController {

    private final KakaoUsersService kakaoUsersService;

    public KakaoUsersController(KakaoUsersService kakaoUsersService) {
        this.kakaoUsersService = kakaoUsersService;
    }

//    @PostMapping("/signUp", consumes = "multipart/form-data")
//    public ResponseEntity<?> registerKakaoUsers(
//    @RequestPart("users") Users users,
//    @RequestPart(value="profileImage", required = false) MultipartFile

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        String code = loginData.get("code");

        try {
            // 카카오 로그인 및 토큰 발급
            Map<String, String> tokens = kakaoUsersService.loginWithKakao(code);
            String kakaoAccessToken = tokens.get("kakaoAccessToken");
            String kakaoRefreshToken = tokens.get("kakaoRefreshToken");

            // Access Token 설정
            ResponseCookie accessTokenCookie = ResponseCookie.from("kakaoAccessToken", kakaoAccessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 30) // 30분
                    .sameSite("Lax")
                    .build();

            // Refresh Token 설정
            ResponseCookie refreshTokenCookie = ResponseCookie.from("kakaoRefreshToken", kakaoRefreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 60 * 24 * 7) // 7일
                    .sameSite("Lax")
                    .build();

            // 응답 헤더에 쿠키 추가
            response.addHeader("Set-Cookie", accessTokenCookie.toString());
            response.addHeader("Set-Cookie", refreshTokenCookie.toString());

            log.info("카카오 로그인 성공 - AccessToken, RefreshToken 쿠키 설정 완료");

            // 리다이렉트 URL 응답
            return ResponseEntity.ok(Map.of("message", "카카오 로그인 성공", "redirect", "/"));
        } catch (IllegalArgumentException e) {
            log.error("카카오 로그인 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", "카카오 로그인 실패", "error", e.getMessage()));
        }
    }
}
