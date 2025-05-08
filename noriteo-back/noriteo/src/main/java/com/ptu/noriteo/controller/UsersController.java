package com.ptu.noriteo.controller;

import com.ptu.noriteo.jwt.JwtUtil;
import com.ptu.noriteo.mapper.UsersMapper;
import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.service.UsersService;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;

@Slf4j
@RestController
@RequestMapping("/api/member")
public class UsersController {

    private final UsersService usersService;
    private final JwtUtil jwtUtil;
    private final UsersMapper usersMapper;

    public UsersController(UsersService usersService, JwtUtil jwtUtil, UsersMapper usersMapper) {
        this.usersService = usersService;
        this.jwtUtil = jwtUtil;
        this.usersMapper = usersMapper;
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

        usersService.registerUsers(users, profileImage);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Map<String, String> loginData, HttpServletResponse response) {
        String userEmail = loginData.get("userEmail");
        String password = loginData.get("password");



        try {
            // 로그인 및 토큰 발급
            Map<String, String> tokens = usersService.loginUser(userEmail, password);
            String normalAccessToken = tokens.get("normalAccessToken");
            String normalRefreshToken = tokens.get("normalRefreshToken");



            // http: secure 설정 false 인 경우
            // Access Token 설정
            ResponseCookie accessTokenCookie = ResponseCookie.from("normalAccessToken", normalAccessToken)
                    .httpOnly(true)
                    .secure(false) // https -> true
                    .path("/")
                    .maxAge(60 * 30)
                    .sameSite("Lax") // https -> Strict
                    .build();

            // Refresh Token 설정
            ResponseCookie refreshTokenCookie = ResponseCookie.from("normalRefreshToken",normalRefreshToken)
                    .httpOnly(true)
                    .secure(false) // https -> true
                    .path("/")
                    .maxAge(60 * 60 * 24 * 7)
                    .sameSite("Lax") // https -> Strict
                    .build();

            // 응답 헤더에 쿠키 추가
            response.addHeader("Set-Cookie", accessTokenCookie.toString());
            response.addHeader("Set-Cookie", refreshTokenCookie.toString());

            // 리다이렉트 하지 않고 상태 코드 반환
            return ResponseEntity.ok().body("로그인 성공");
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body("로그인 실패: " + e.getMessage());
        }
    }


//    @GetMapping("/me")
//    public ResponseEntity<?> getMyInfo(@RequestHeader("Authorization") String authHeader) {
//        try {
//            String token = authHeader.replace("Bearer ", "");
//            Long userId = jwtUtil.getUserIdFromAccessToken(token); // 토큰에서 userId 뽑기
//            Users users = usersService.findById(userId);           // userId로 유저 찾기
//
//            if (users == null) {
//                return ResponseEntity.badRequest().body("사용자 정보를 찾을 수 없습니다.");
//            }
//
//            return ResponseEntity.ok(users); // 유저 정보 반환
//        } catch (Exception e) {
//            return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
//        }
//    }
@GetMapping("/me")
public ResponseEntity<?> getMyInfo(
        @CookieValue(value = "normalAccessToken", required = false) String normalToken,
        @CookieValue(value = "kakaoAccessToken", required = false) String kakaoToken,
        @CookieValue(value = "naverAccessToken", required = false) String naverToken) {

    try {
        String token = normalToken != null ? normalToken :
                kakaoToken != null ? kakaoToken :
                        naverToken;

        if (token == null) {
            return ResponseEntity.status(401).body("토큰이 존재하지 않습니다.");
        }

        Long userId = jwtUtil.getUserIdFromAccessToken(token);
        Users users = usersService.findById(userId);
        return ResponseEntity.ok(users);
    } catch (Exception e) {
        return ResponseEntity.status(401).body("유효하지 않은 토큰입니다.");
    }
}


    @PostMapping("/refresh")
    public ResponseEntity<?> refreshAccessToken(
            @CookieValue(value = "normalRefreshToken", required = false) String normalRefreshToken,
            @CookieValue(value = "kakaoRefreshToken", required = false) String kakaoRefreshToken,
            @CookieValue(value = "naverRefreshToken", required = false) String naverRefreshToken,
            HttpServletResponse response
    ) {
        String token = normalRefreshToken != null ? normalRefreshToken
                : kakaoRefreshToken != null ? kakaoRefreshToken
                : naverRefreshToken;

        if (token == null || !jwtUtil.validateToken(token)) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Refresh Token이 유효하지 않음");
        }

        Long userId = jwtUtil.getUserIdFromAccessToken(token);
        Users user = usersService.findById(userId);
        if (user == null) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("유저 없음");
        }


        String provider = user.getProvider();
        String roleName = usersMapper.getRoleNameById(user.getRoleId());


        String newAccessToken;
        String tokenName;

        switch (provider) {
            case "normal":
                newAccessToken = jwtUtil.generateNormalAccessToken(userId, user.getUserEmail(), roleName);
                tokenName = "normalAccessToken";
                break;
            case "kakao":
                newAccessToken = jwtUtil.generateKakaoAccessToken(userId, user.getUserEmail(), roleName);
                tokenName = "kakaoAccessToken";
                break;
            case "naver":
                newAccessToken = jwtUtil.generateNaverAccessToken(userId, user.getUserEmail(), roleName);
                tokenName = "naverAccessToken";
                break;
            default:
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Provider 오류");
        }



        // ✅ 쿠키 재설정
        ResponseCookie accessCookie = ResponseCookie.from(tokenName, newAccessToken)
                .path("/")
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .maxAge(60 * 30) // 30분
                .build();
        response.setHeader("Set-Cookie", accessCookie.toString());

//        return ResponseEntity.ok().build(); // 내용 없이 OK


        // ✅ accessToken + provider 반환 (프론트가 쿠키에 저장할 수 있도록)
        Map<String, String> responseBody = new HashMap<>();
        responseBody.put("accessToken", newAccessToken);
        responseBody.put("provider", provider);

        return ResponseEntity.ok(responseBody);

    }

    // 클래스 내부 가장 아래쪽에 추가
    private ResponseCookie buildCookie(String name, String token, long maxAge) {
        return ResponseCookie.from(name, token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(maxAge)
                .build();
    }



    @PostMapping("/logout")
    public ResponseEntity<?> logoutUser(HttpServletResponse response) {
        // 모든 로그인 유형의 쿠키를 만료시킴
        ResponseCookie deleteNormalAccessToken = ResponseCookie.from("normalAccessToken", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();

        ResponseCookie deleteNormalRefreshToken = ResponseCookie.from("normalRefreshToken", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();

        ResponseCookie deleteKakaoAccessToken = ResponseCookie.from("kakaoAccessToken", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();

        ResponseCookie deleteKakaoRefreshToken = ResponseCookie.from("kakaoRefreshToken", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();

        ResponseCookie deleteNaverAccessToken = ResponseCookie.from("naverAccessToken", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();

        ResponseCookie deleteNaverRefreshToken = ResponseCookie.from("naverRefreshToken", "")
                .path("/")
                .httpOnly(true)
                .maxAge(0)
                .build();

        // 응답에 쿠키 삭제 설정 추가
        response.addHeader("Set-Cookie", deleteNormalAccessToken.toString());
        response.addHeader("Set-Cookie", deleteNormalRefreshToken.toString());
        response.addHeader("Set-Cookie", deleteKakaoAccessToken.toString());
        response.addHeader("Set-Cookie", deleteKakaoRefreshToken.toString());
        response.addHeader("Set-Cookie", deleteNaverAccessToken.toString());
        response.addHeader("Set-Cookie", deleteNaverRefreshToken.toString());

        return ResponseEntity.ok("로그아웃 완료");
    }



}
