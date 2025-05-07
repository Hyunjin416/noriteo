package com.ptu.noriteo.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseCookie;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;

    @Override
//    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
//            throws ServletException, IOException {
//
//        String token = getTokenFromRequest(request);
//
//        if (token != null && jwtUtil.validateToken(token)) {
//            var claims = jwtUtil.getClaims(token);
//            Long userId = claims.get("userId", Long.class);
//            String userEmail = claims.get("userEmail", String.class);
//            String role = claims.get("role", String.class);
//
//            // ROLE_USER, ROLE_ADMIN 같은 권한 부여
//            var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
//
//            // JwtAuthentication: 직접 만든 인증 객체
//            var authentication = new JwtAuthentication(userId, userEmail, authorities);
//            authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//            SecurityContextHolder.getContext().setAuthentication(authentication);
//        }
//
//        chain.doFilter(request, response);
//    }
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain)
            throws ServletException, IOException {

        String token = getTokenFromRequest(request);

        if (token != null && jwtUtil.validateToken(token)) {
            authenticateWithToken(token, request); // 🔁 아래 함수 따로 빼줌
        } else {
            // 🔁 토큰이 없거나 유효하지 않음 → Refresh 시도
            String refreshToken = getRefreshTokenFromCookie(request);

            if (refreshToken != null && jwtUtil.validateToken(refreshToken)) {
                Long userId = jwtUtil.getUserIdFromAccessToken(refreshToken);
                var userEmail = jwtUtil.getClaims(refreshToken).get("userEmail", String.class);
                var role = jwtUtil.getClaims(refreshToken).get("role", String.class);

                // ✅ 여기서 사용해야 돼!
                String newAccessToken = jwtUtil.generateNormalAccessToken(userId, userEmail, role);

                ResponseCookie newAccessTokenCookie = ResponseCookie.from("normalAccessToken", newAccessToken)
                        .httpOnly(true)
                        .secure(false)
                        .path("/")
                        .maxAge(60 * 30)
                        .sameSite("Lax")
                        .build();

                response.addHeader("Set-Cookie", newAccessTokenCookie.toString());

                authenticateWithToken(newAccessToken, request);
            }

        }


        chain.doFilter(request, response);
    }



    private String getTokenFromRequest(HttpServletRequest request) {
        // 1. Authorization 헤더에서 먼저 시도
        String header = request.getHeader("Authorization");
        if (header != null && header.startsWith("Bearer ")) {
            return header.substring(7);
        }

        // 2. 없으면 쿠키에서 시도
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().equals("normalAccessToken") ||
                        cookie.getName().equals("kakaoAccessToken") ||
                        cookie.getName().equals("naverAccessToken")) {
                    return cookie.getValue();
                }
            }
        }

        return null;
    }

//    private void authenticateWithToken(String token, HttpServletRequest request) {
//        var claims = jwtUtil.getClaims(token);
//        Long userId = claims.get("userId", Long.class);
//        String userEmail = claims.get("userEmail", String.class);
//        String role = claims.get("role", String.class);
//
//        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));
//
//        var authentication = new JwtAuthentication(userId, userEmail, authorities);
//        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));
//
//        SecurityContextHolder.getContext().setAuthentication(authentication);
//    }

    private void authenticateWithToken(String token, HttpServletRequest request) {
        var claims = jwtUtil.getClaims(token);
        Long userId = claims.get("userId", Long.class);
        String userEmail = claims.get("userEmail", String.class);
        String role = claims.get("role", String.class);


        // 🛡️ null 방어 추가
        if (role == null) {
            log.error("🚫 JWT에 role 정보 없음 - 인증 중단");
            return;
        }

        var authorities = List.of(new SimpleGrantedAuthority("ROLE_" + role.toUpperCase()));

        var authentication = new JwtAuthentication(userId, userEmail, authorities);
        authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

        SecurityContextHolder.getContext().setAuthentication(authentication);
    }


    private String getRefreshTokenFromCookie(HttpServletRequest request) {
        if (request.getCookies() != null) {
            for (var cookie : request.getCookies()) {
                if (cookie.getName().contains("RefreshToken")) {
                    return cookie.getValue();
                }
            }
        }
        return null;
    }





}
