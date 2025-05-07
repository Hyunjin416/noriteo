package com.ptu.noriteo.service;

import com.ptu.noriteo.jwt.JwtUtil;
import com.ptu.noriteo.mapper.NaverUsersMapper;
import com.ptu.noriteo.model.Users;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.sql.Date;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

@RequiredArgsConstructor
@Service
public class NaverUsersService {

    private final NaverUsersMapper naverUsersMapper;
    private final JwtUtil jwtUtil;

    @Value("${naver.client-id}")
    private String clientId;

    @Value("${naver.client-secret}")
    private String clientSecret;

    @Value("${naver.redirect-uri}")
    private String redirectUri;

    public Map<String, String> loginWithNaver(String code) {
        // 1. 토큰 요청
        String tokenUrl = "https://nid.naver.com/oauth2.0/token";
        HttpHeaders tokenHeaders = new HttpHeaders();
        tokenHeaders.setContentType(MediaType.APPLICATION_FORM_URLENCODED);
        String tokenBody = String.format(
                "grant_type=authorization_code&client_id=%s&client_secret=%s&code=%s&redirect_uri=%s",
                clientId, clientSecret, code, redirectUri
        );
        HttpEntity<String> tokenRequest = new HttpEntity<>(tokenBody, tokenHeaders);
        RestTemplate restTemplate = new RestTemplate();
        ResponseEntity<Map> tokenResponse = restTemplate.postForEntity(tokenUrl, tokenRequest, Map.class);

        if (!tokenResponse.getStatusCode().is2xxSuccessful()) {
            throw new IllegalArgumentException("네이버 로그인 실패 - 토큰 요청 실패");
        }

        String accessToken = (String) tokenResponse.getBody().get("access_token");
        String refreshToken = (String) tokenResponse.getBody().get("refresh_token");

        // 2. 사용자 정보 요청
        String userInfoUrl = "https://openapi.naver.com/v1/nid/me";
        HttpHeaders userInfoHeaders = new HttpHeaders();
        userInfoHeaders.setBearerAuth(accessToken);
        HttpEntity<Void> userInfoRequest = new HttpEntity<>(userInfoHeaders);
        ResponseEntity<Map> userInfoResponse = restTemplate.exchange(userInfoUrl, HttpMethod.GET, userInfoRequest, Map.class);

        if (!userInfoResponse.getStatusCode().is2xxSuccessful()) {
            throw new IllegalArgumentException("네이버 로그인 실패 - 사용자 정보 요청 실패");
        }

        Map<String, Object> response = (Map<String, Object>) userInfoResponse.getBody().get("response");

        String naverId = (String) response.get("id");
        String email = (String) response.get("email");
        String name = (String) response.get("name");
        String genderRaw = response.get("gender") != null ? response.get("gender").toString() : null;
        String gender = null;
        if ("M".equalsIgnoreCase(genderRaw)) {
            gender = "남성";
        } else if ("F".equalsIgnoreCase(genderRaw)) {
            gender = "여성";
        }
        String mobile = response.get("mobile") != null ? response.get("mobile").toString() : null;
        String profileImage = response.get("profile_image") != null ? response.get("profile_image").toString() : null;
        String birthyear = response.get("birthyear") != null ? response.get("birthyear").toString() : null;
        String birthdayRaw = response.get("birthday") != null ? response.get("birthday").toString() : null;

        System.out.println("birthyear: " + birthyear);
        System.out.println("birthdayRaw: " + birthdayRaw);

        // birthday 가 "MMDD" 형식이라면 "MM-DD"로 변환
        String birthday = null;
        if (birthdayRaw != null && birthdayRaw.length() == 4) {
            birthday = birthdayRaw.substring(0, 2) + "-" + birthdayRaw.substring(2);
        }
    // 생년월일 조합 (ex: 2001-12-17)
        String birth = null;
        if (birthyear != null && birthdayRaw != null) {
            String cleanedBirthday = birthdayRaw.replace("-", ""); // "1217"
            if (cleanedBirthday.length() == 4) {
                String birthdayFormatted = cleanedBirthday.substring(0, 2) + "-" + cleanedBirthday.substring(2); // "12-17"
                String fullDateString = birthyear + "-" + birthdayFormatted; // "2001-12-17"

                try {
                    DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");
                    LocalDate localDate = LocalDate.parse(fullDateString, formatter);
                    birth = Date.valueOf(localDate).toString();
                } catch (Exception e) {
                    System.out.println("날짜 파싱 실패: " + fullDateString);
                }
            }
        }
        System.out.println("파싱된 birth 값: " + birth);


        System.out.println("naverId: " + naverId);
        Users existingUser = naverUsersMapper.findByProviderId(naverId);
        System.out.println("existingUser: " + existingUser);

        if (existingUser == null) {
            Users newUser = new Users();
            newUser.setProvider("naver");
            newUser.setProviderId(naverId);
            newUser.setUserEmail(email);
            newUser.setUserName(name);
            newUser.setGender(gender);
            newUser.setMobile(mobile);
            newUser.setPhone(null); // 따로 수집하지 않으므로 null
            newUser.setBirth(birth);
            newUser.setZipcode(null);  // 주소 관련 항목도 따로 없음
            newUser.setAddress1(null);
            newUser.setAddress2(null);
            newUser.setOriginUser(profileImage);
            newUser.setSysUser(profileImage);
            newUser.setRoleId(2L);
            naverUsersMapper.insertNaverUser(newUser);
            existingUser = newUser;
        }

        // 3. JWT 토큰 발급
        String accessJwt = jwtUtil.generateNaverAccessToken(existingUser.getUserId(), existingUser.getUserEmail(), "USER");
        String refreshJwt = jwtUtil.generateNaverRefreshToken(existingUser.getUserId(), "USER");

        Map<String, String> tokens = new HashMap<>();
        tokens.put("naverAccessToken", accessJwt);
        tokens.put("naverRefreshToken", refreshJwt);
        return tokens;
    }
}
