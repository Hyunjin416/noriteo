package com.ptu.noriteo.jwt;

import org.springframework.security.authentication.AbstractAuthenticationToken;
import org.springframework.security.core.GrantedAuthority;

import java.util.Collection;

public class JwtAuthentication extends AbstractAuthenticationToken {

    private final Long userId;
    private final String userEmail;

    public JwtAuthentication(Long userId, String userEmail, Collection<? extends GrantedAuthority> authorities) {
        super(authorities);
        this.userId = userId;
        this.userEmail = userEmail;
        super.setAuthenticated(true);
    }

    @Override
    public Object getCredentials() {
        return null;
    }

    @Override
    public Object getPrincipal() {
        return userEmail;
    }

    public Long getUserId() {
        return userId;
    }
}
