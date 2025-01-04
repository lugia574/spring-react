package com.back.back.controller;

import com.back.back.constants.MessageConstants;
import com.back.back.dto.auth.EmailCheckRequest;
import com.back.back.dto.auth.JoinRequest;
import com.back.back.dto.auth.LoginRequest;
import com.back.back.entity.User;
import com.back.back.security.JwtTokenProvider;
import com.back.back.service.UserService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/user")
public class UserController {
    @Autowired
    private UserService userService;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;

    @ResponseBody
    @GetMapping("/userList")
    public List<User> userApi(){
        return userService.getUserApi();
    }

    @PostMapping("/join")
    public ResponseEntity<Map<String, String>> joinUser(@RequestBody JoinRequest joinRequest){
        Map<String, String> response = new HashMap<>();

        boolean isUserCreated = userService.joinUser(joinRequest);

        if(isUserCreated){
            response.put("message", MessageConstants.OK_JOIN);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        }
        response.put("message", MessageConstants.INTERNAL_SERVER_ERROR);
        return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
    }

    @PostMapping("/join/check")
    public ResponseEntity<Map<String, String>> userIsEmail(@RequestBody EmailCheckRequest emailCheckRequest){
        Map<String, String> response = new HashMap<>();
        try {
            boolean exists = userService.isEmailExists(emailCheckRequest.getEmail());
            if (exists) {
                response.put("message", MessageConstants.ALREADY_EMAIL);
                return ResponseEntity.status(HttpStatus.CONFLICT).body(response);
            }
            response.put("message", MessageConstants.OK_EMAIL);
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", MessageConstants.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, String>> userLogin(@RequestBody LoginRequest loginRequest){
        Map<String, String> response = new HashMap<>();
        try {
            User user = userService.getUserByEmail(loginRequest.getEmail());
            if(!userService.comparePassword(loginRequest.getPassword(), user.getPassword())){
                response.put("message", MessageConstants.BAD_REQUEST_LOGIN);
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(response);
            }
            String token = userService.generateToken(loginRequest.getEmail());
            response.put("message", MessageConstants.OK_LOGIN);
            response.put("token", token);
            response.put("nickname", user.getNickname());
            response.put("email", user.getEmail());
            return ResponseEntity.status(HttpStatus.OK).body(response);
        } catch (Exception e) {
            response.put("message", MessageConstants.INTERNAL_SERVER_ERROR);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(response);
        }

    }



    @PostMapping("/logout")
    public ResponseEntity<Map<String, String>> logout(@RequestHeader(value = "Authorization", required = false) String token, HttpServletResponse response){
        Map<String, String> responseBody = new HashMap<>();

        try {
            if(token == null || token.isEmpty()){
                ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(Map.of("message", MessageConstants.UNAUTHORIZED_NOT_LOGIN));
            }
            // 토큰 검증
            if(JwtTokenProvider.validateJwtToken(token)){
                // 실제 로그아웃 처리 (예: 토큰 무효화 로직 추가 가능)
                response.setHeader("Authorization", "");
                response.addCookie(createClearCookie("refresh_token"));

                // 성공 응답
                responseBody.put("message", MessageConstants.OK_LOGOUT);
                return ResponseEntity.status(HttpStatus.OK).body(responseBody);
            }else throw new IllegalArgumentException("Invalid token");

        }catch (IllegalArgumentException e){
            responseBody.put("message", MessageConstants.UNAUTHORIZED_NOT_LOGIN);
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(responseBody);
        }
    }


    private Cookie createClearCookie(String name) {
        Cookie cookie = new Cookie(name, null);
        cookie.setHttpOnly(true);
        cookie.setSecure(true);
        cookie.setPath("/");
        cookie.setMaxAge(0);
        return cookie;
    }
}
