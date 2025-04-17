package com.ptu.noriteo.controller;

import com.ptu.noriteo.service.NaverUsersService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/naver")
@RequiredArgsConstructor
public class NaverUsersController {

    private final NaverUsersService naverUsersService;

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        log.info("/api/naver/login 도착, 받은 코드: {}", loginData.get("code"));

        String code = loginData.get("code");

        try {
            Map<String, String> tokens = naverUsersService.loginWithNaver(code);
            String accessToken = tokens.get("naverAccessToken");
            String refreshToken = tokens.get("naverRefreshToken");

            ResponseCookie accessCookie = ResponseCookie.from("naverAccessToken", accessToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 30)
                    .sameSite("Lax")
                    .build();

            ResponseCookie refreshCookie = ResponseCookie.from("naverRefreshToken", refreshToken)
                    .httpOnly(true)
                    .secure(false)
                    .path("/")
                    .maxAge(60 * 60 * 24 * 7)
                    .sameSite("Lax")
                    .build();

            response.addHeader("Set-Cookie", accessCookie.toString());
            response.addHeader("Set-Cookie", refreshCookie.toString());

            log.info("네이버 로그인 성공 - AccessToken, RefreshToken 쿠키 설정 완료");

            return ResponseEntity.ok(Map.of(
                    "message", "네이버 로그인 성공",
                    "redirect", "/",
                    "tokens", Map.of(
                            "naverAccessToken", accessToken,
                            "naverRefreshToken", refreshToken
                    )
            ));
        } catch (IllegalArgumentException e) {
            log.error("네이버 로그인 실패: {}", e.getMessage());
            return ResponseEntity.badRequest().body(Map.of("message", "네이버 로그인 실패", "error", e.getMessage()));
        }
    }
}