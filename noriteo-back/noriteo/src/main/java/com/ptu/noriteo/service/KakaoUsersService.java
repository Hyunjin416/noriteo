package com.ptu.noriteo.service;

import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.http.ResponseEntity;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import java.util.HashMap;
import java.util.Map;

@Service
public class KakaoUsersService {

    private final String clientId = "YOUR_CLIENT_ID"; // 카카오 REST API 키
    private final String redirectUri = "YOUR_REDIRECT_URI"; // 리다이렉트 URI

    public Map<String, String> loginWithKakao(String code) {
        String tokenUrl = "https://kauth.kakao.com/oauth/token";

        // 요청 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // 요청 바디 설정
        String body = String.format(
                "grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s",
                clientId, redirectUri, code
        );

        // HTTP 요청
        RestTemplate restTemplate = new RestTemplate();
        HttpEntity<String> request = new HttpEntity<>(body, headers);

        // 토큰 요청
        ResponseEntity<Map> response = restTemplate.postForEntity(tokenUrl, request, Map.class);

        if (response.getStatusCode().is2xxSuccessful()) {
            Map<String, String> tokens = new HashMap<>();
            Map<String, Object> responseBody = response.getBody();

            // Access Token과 Refresh Token 추출
            String accessToken = (String) responseBody.get("access_token");
            String refreshToken = (String) responseBody.get("refresh_token");

            tokens.put("kakaoAccessToken", accessToken);
            tokens.put("kakaoRefreshToken", refreshToken);
            return tokens;
        }

        throw new IllegalArgumentException("카카오 로그인 실패 - 응답 코드: " + response.getStatusCodeValue());
    }
}
