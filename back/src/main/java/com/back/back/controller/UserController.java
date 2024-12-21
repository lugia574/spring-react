package com.back.back.controller;

import com.back.back.entity.User;
import com.back.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class UserController {
    @Autowired
    private UserService userService;

    @ResponseBody
    @GetMapping("/api/user")
    public List<User> userApi(){
        return userService.getUserApi();
    }

    @PostMapping("/api/user/join")
    public boolean createUser(User user){
        return userService.createUser(user) ? true : false;
    }

    @PostMapping("/api/user/login")
    public boolean loginUser(){
        return false;
    }

    @PostMapping("api/user/logout")
    public boolean logoutUser(){
        return false;
    }
}
