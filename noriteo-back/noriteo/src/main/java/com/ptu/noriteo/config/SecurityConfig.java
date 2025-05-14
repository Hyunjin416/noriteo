    package com.ptu.noriteo.config;

    import com.ptu.noriteo.jwt.JwtAuthenticationFilter;
    import com.ptu.noriteo.jwt.JwtUtil;
    import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
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

        private final JwtUtil jwtUtil;

        public SecurityConfig(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
            http
                    .csrf(csrf -> csrf.disable())
                    .cors(cors -> cors.configurationSource(corsConfigurationSource()))
                    .authorizeHttpRequests(auth -> auth
                            .requestMatchers(
                                    "/api/member/login",
                                    "/api/member/signUp",
                                    "/api/kakao/login",
                                    "/kakao-callback",
                                    "/api/naver/login",
                                    "/naver-callback",
                                    "/api/board/list/**",
                                    "/api/board/detail/**",
                                    "/api/board/popular",
//                                    "/api/comments/{boardId}",,
                                    "/api/comments/**",
                                    "/uploads/**",
                                    "/error"
                            ).permitAll()

                            .requestMatchers(
                                    "/api/board/write",
                                    "/api/board/update/**",
                                    "/api/board/delete/**",
                                    "/api/comments",
                                    "/api/comments/**",
                                    "/api/member/me",
                                    "/api/member/update",
                                    "/api/board/*/save",
                                    "/api/board/*/like",
                                    "/api/board/my/comments"
                            ).authenticated()

                            .anyRequest().authenticated()
                    )

                    .addFilterBefore(new JwtAuthenticationFilter(jwtUtil), UsernamePasswordAuthenticationFilter.class); // ✅ 여기 추가

            return http.build();
        }

        @Bean
        public BCryptPasswordEncoder passwordEncoder() {
            return new BCryptPasswordEncoder();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource() {
            CorsConfiguration configuration = new CorsConfiguration();
            configuration.setAllowedOrigins(List.of("http://localhost:5173"));
            configuration.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS"));
            configuration.setAllowedHeaders(List.of("Authorization", "Content-Type", "X-Requested-With", "Accept"));
            configuration.addExposedHeader("Authorization");
            configuration.addExposedHeader("Set-Cookie");
            configuration.setAllowCredentials(true);



            UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
            source.registerCorsConfiguration("/**", configuration);
            return source;
        }
    }
