package com.back.back.service;

import com.back.back.data.dto.auth.JoinRequest;
import com.back.back.data.entity.UserEntity;

import java.util.List;

public interface UserService {
    List<UserEntity> getUserApi();
    boolean joinUser(JoinRequest joinRequest);
    UserEntity getUserByEmail(String email);
    boolean isEmailExists(String email);
    boolean comparePassword(String rawPassword, String encodedPassword);
    void resignUser(String email);
    String generateToken(String email);
    UserEntity userDetail(String email);
}
