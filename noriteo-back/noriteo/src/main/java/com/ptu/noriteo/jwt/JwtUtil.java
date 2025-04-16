package com.ptu.noriteo.jwt;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

@Slf4j
@Component
public class JwtUtil {

    // Secret Key와 만료 시간 설정
    @Value("${jwt.secret-key}")
    private String secretKey;

    @Value("${jwt.access-token-expiration}")
    private long accessTokenExpiration;

    @Value("${jwt.refresh-token-expiration}")
    private long refreshTokenExpiration;

    // Secret Key 생성 메서드
    private Key getSigningKey() {
        return Keys.hmacShaKeyFor(secretKey.getBytes(StandardCharsets.UTF_8));
    }

    // JWT 생성 메서드
    public String createToken(Map<String, Object> claims, String subject, long expiration) {
        return Jwts.builder()
                .setClaims(claims)
                .setSubject(subject)
                .setIssuedAt(new Date(System.currentTimeMillis()))
                .setExpiration(new Date(System.currentTimeMillis() + expiration * 1000))
                .signWith(getSigningKey(), SignatureAlgorithm.HS256)
                .compact();
    }

    // Normal Access Token 생성
    public String generateNormalAccessToken(Long userId, String userEmail, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("userEmail", userEmail);
        claims.put("role", role);
        return createToken(claims, "normalAccessToken", accessTokenExpiration);
    }

    // Normal Refresh Token 생성
    public String generateNormalRefreshToken(Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        return createToken(claims, "normalRefreshToken", refreshTokenExpiration);
    }

    // Kakao Access Token 생성
    public String generateKakaoAccessToken(Long userId, String userEmail, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("userEmail", userEmail);
        claims.put("role", role);
        return createToken(claims, "kakaoAccessToken", accessTokenExpiration);
    }

    // Kakao Refresh Token 생성
    public String generateKakaoRefreshToken(Long userId) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        return createToken(claims, "kakaoRefreshToken", refreshTokenExpiration);
    }

    // Naver Access Token 생성
    public String generateNaverAccessToken(Long userId, String userEmail, String role) {
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        claims.put("userEmail", userEmail);
        claims.put("role", role);
        return createToken(claims, "naverAccessToken", accessTokenExpiration);
    }

    // Naver Refresh Token 생성
    public String generateNaverRefreshToken(Long userId){
        Map<String, Object> claims = new HashMap<>();
        claims.put("userId", userId);
        return createToken(claims, "naverRefreshToken", refreshTokenExpiration);
    }
    // JWT 유효성 검사
    public boolean validateToken(String token) {
        try {
            Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            log.error("❌ Invalid or expired JWT: {}", e.getMessage());
            return false;
        }
    }

    // JWT에서 클레임 추출
    public Claims getClaims(String token) {
        try {
            return Jwts.parserBuilder()
                    .setSigningKey(getSigningKey())
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
        } catch (JwtException e) {
            log.error("❌ Failed to get claims: {}", e.getMessage());
            return null;
        }
    }
}
