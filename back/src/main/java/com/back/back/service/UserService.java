package com.back.back.service;

import com.back.back.data.dto.auth.JoinRequest;
import com.back.back.data.entity.User;

import java.util.List;

public interface UserService {
    List<User> getUserApi();
    boolean joinUser(JoinRequest joinRequest);
    User getUserByEmail(String email);
    boolean isEmailExists(String email);
    boolean comparePassword(String rawPassword, String encodedPassword);
    void resignUser(String email);
    String generateToken(String email);
    User userDetail(String email);
}
