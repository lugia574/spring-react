package com.back.back.controller;

import com.back.back.dto.auth.LoginRequest;
import com.back.back.entity.User;
import com.back.back.security.JwtTokenProvider;
import com.back.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @ResponseBody
    @GetMapping("/user")
    public List<User> userApi(){
        return userService.getUserApi();
    }

    @PostMapping("/join")
    public ResponseEntity<String> createUser(User user){
        boolean isUserCreated = userService.createUser(user);
        if(isUserCreated){
            return ResponseEntity.status(HttpStatus.CREATED).body("User created successfully");
        }else
         return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Failed to create user: Email already exists");
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestParam String email, @RequestParam String password){
        try {
            String token = userService.userLogin(email, password);
            return ResponseEntity.status(HttpStatus.OK).body(token);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }

    }

    @PostMapping("/logout")
    public boolean logoutUser(){
        return false;
    }
}
