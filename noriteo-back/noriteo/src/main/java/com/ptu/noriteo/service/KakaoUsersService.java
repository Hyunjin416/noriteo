package com.ptu.noriteo.service;

import com.ptu.noriteo.jwt.JwtUtil;
import com.ptu.noriteo.mapper.KakaoUsersMapper;
import com.ptu.noriteo.model.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class KakaoUsersService {

    private final KakaoUsersMapper kakaoUsersMapper;
    private final JwtUtil jwtUtil;

    @Value("${kakao.client-id}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    public Map<String, String> loginWithKakao(String code) {
        // 1. access_token 받기
        String tokenUrl = "https://kauth.kakao.com/oauth/token";
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String tokenBody = String.format(
                "grant_type=authorization_code&client_id=%s&redirect_uri=%s&code=%s",
                clientId, redirectUri, code
        );
        HttpEntity<String> tokenRequest = new HttpEntity<>(tokenBody, tokenHeaders);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, tokenRequest, Map.class);

        if (!tokenResponse.getStatusCode().is2xxSuccessful()) {
            throw new IllegalArgumentException("카카오 로그인 실패 - 토큰 요청 실패");
        }

        // 카카오 api 공식 이름이 access_token, refresh_token임
        String kakaoAccessToken = (String) tokenResponse.getBody().get("access_token");
        String kakaoRefreshToken = (String) tokenResponse.getBody().get("refresh_token");

        // 2. 사용자 정보 요청
        String userInfoUrl = "https://kapi.kakao.com/v2/user/me";
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(kakaoAccessToken);
        HttpEntity<Void> userInfoRequest = new HttpEntity<>(userInfoHeaders);
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);

        if (!userInfoResponse.getStatusCode().is2xxSuccessful()) {
            throw new IllegalArgumentException("카카오 로그인 실패 - 사용자 정보 요청 실패");
        }

        Map<String, Object> kakaoUser = userInfoResponse.getBody();
        Long kakaoId = ((Number) kakaoUser.get("id")).longValue();
        Map<String, Object> kakaoAccount = (Map<String, Object>) kakaoUser.get("kakao_account");
        Map<String, Object> properties = (Map<String, Object>) kakaoUser.get("properties");

        String email = kakaoAccount.get("email") != null ? kakaoAccount.get("email").toString() : "unknown@kakao.com";
        String nickname = properties.get("nickname").toString();

        // 3. DB에 유저 등록 or 조회
        Users existingUser = kakaoUsersMapper.findByProviderId(kakaoId.toString());
        if (existingUser == null) {
            Users newUser = new Users();
            newUser.setProvider("kakao");
            newUser.setProviderId(kakaoId.toString());
            newUser.setUserEmail(email);
            newUser.setUserName(nickname);
            newUser.setRoleId(2L); // 일반 사용자
            kakaoUsersMapper.insertKakaoUser(newUser);
            existingUser = newUser;
        }

        // 4. JWT 생성
        String accessJwt = jwtUtil.generateKakaoAccessToken(existingUser.getUserId(), existingUser.getUserEmail(), "USER");
        String refreshJwt = jwtUtil.generateKakaoRefreshToken(existingUser.getUserId(), "USER");

        // 5. 결과 반환
        Map<String, String> tokens = new HashMap<>();
        tokens.put("kakaoAccessToken", accessJwt);
        tokens.put("kakaoRefreshToken", refreshJwt);
        return tokens;
    }
}
