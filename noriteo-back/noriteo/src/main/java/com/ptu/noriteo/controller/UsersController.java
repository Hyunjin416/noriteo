package com.ptu.noriteo.controller;


import com.ptu.noriteo.model.Users;
import com.ptu.noriteo.service.UsersService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/member")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/signup")
    public ResponseEntity<?> registerUsers(@RequestBody Users users) {
        if (usersService.findByEmail(users.getUserEmail()) != null) {
            return ResponseEntity.badRequest().body("이미 존재하는 이메일입니다.");
        }
        usersService.registerUsers(users);
        return ResponseEntity.ok("회원가입 성공");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody Users users) {
        Users dbUser = usersService.findByEmail(users.getUserEmail());
        if (dbUser == null || !dbUser.getPassword().equals(users.getPassword())) {
            return ResponseEntity.badRequest().body("로그인 실패");
        }
        return ResponseEntity.ok("로그인 성공");
    }
}
