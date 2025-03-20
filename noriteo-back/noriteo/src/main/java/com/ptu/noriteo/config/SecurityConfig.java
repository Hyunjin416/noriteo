package com.ptu.noriteo.config;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) ; // CSRF 보호 해제 (프론트-백엔드 분리 환경)
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/login").permitAll()  // 🔥 로그인 페이지 접근 허용
//                        .anyRequest().authenticated()  // 🔥 나머지 요청은 인증 필요
//                )
//                .formLogin(form -> form
//                        .loginPage("/login")  // Spring Security 기본 로그인 페이지 활성화
//                        .defaultSuccessUrl("/", true)  // 로그인 성공 시 메인 페이지 이동
//                        .permitAll()
//                )
//                .logout(logout -> logout
//                        .logoutUrl("/logout")
//                        .logoutSuccessUrl("/login")
//                        .permitAll()
//                );

        return http.build();
    }
}



//@Configuration
//@EnableWebSecurity
//public class SecurityConfig {
//
//    @Bean
//    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//        http
//                .cors(cors -> cors.configurationSource(request -> {
//                    CorsConfiguration config = new CorsConfiguration();
//                    config.setAllowedOrigins(List.of("http://localhost:5173")); // 프론트 URL
//                    config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE"));
//                    config.setAllowCredentials(true);
//                    config.setAllowedHeaders(List.of("*"));
//                    return config;
//                }))
//                .authorizeHttpRequests(auth -> auth
//                        .requestMatchers("/api/member/login").permitAll()
//                        .anyRequest().authenticated()
//                )
//                .csrf(csrf -> csrf.disable());
//
//        return http.build();
//    }
//}
