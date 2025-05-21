package com.ptu.noriteo.config;

import com.ptu.noriteo.model.Users;
import java.util.Collection;
import java.util.List;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;

public class CustomUser extends User {
    private static final long serialVersionUID = 1L;
    private Users users;

    public CustomUser(String username, String password, Collection<? extends GrantedAuthority> authorities) {
        super(username, password, authorities);
    }

    public CustomUser(Users users) {
        super(users.getUserEmail(), users.getPassword(), List.of(new SimpleGrantedAuthority("ROLE_USER")));
        this.users = users;
    }

    public Users getUsers() {
        return users;
    }

    public Long getUserId() {
        return users.getUserId();
    }
}
