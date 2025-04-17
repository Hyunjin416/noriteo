package com.ptu.noriteo.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.List;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화
                .cors(cors -> cors.configurationSource(corsConfigurationSource()))  // CORS 설정
                .authorizeHttpRequests(auth -> auth
                        // 로그인 없이 접근 가능한 API들
                        .requestMatchers(
                                "/api/member/login",
                                "/api/member/signUp",
                                "/api/kakao/login",
                                "/kakao-callback",
                                "/api/naver/login",
                                "/naver-callback",
                                "/api/board/list",
                                "/api/board/detail/**"
                        ).permitAll()

                        // 로그인 필요: 글 작성, 수정, 삭제
                        .requestMatchers(
                                "/api/board/write",
                                "/api/board/update/**",
                                "/api/board/delete/**"

                        ).authenticated()

                        // 그 외는 전부 로그인 필요
                        .anyRequest().authenticated()
                );

        return http.build();
    }


    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    // CORS 설정 메서드
    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(List.of("http://localhost:5173"));  // React 개발 서버 주소
        configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
        configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept"));
        configuration.addExposedHeader("Authorization");  // 토큰 응답 헤더 노출
        configuration.addExposedHeader("Set-Cookie");  // 쿠키 응답 헤더 노출
        configuration.setAllowCredentials(true);  // 쿠키 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", configuration);
        return source;
    }
}
