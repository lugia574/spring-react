package com.back.back.service.impl;

import com.back.back.data.dao.UserDAO;
import com.back.back.data.dto.auth.JoinRequest;
import com.back.back.data.entity.User;
import com.back.back.security.JwtTokenProvider;
import com.back.back.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserServiceImpl implements UserService {

    private final UserDAO userDAO;

    private final PasswordEncoder passwordEncoder;

    private final JwtTokenProvider jwtTokenProvider;


    @Autowired
    public UserServiceImpl(UserDAO userDAO, PasswordEncoder passwordEncoder, JwtTokenProvider jwtTokenProvider){
        this.userDAO = userDAO;
        this.passwordEncoder = passwordEncoder;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @Override
    public List<User> getUserApi() {
        return userDAO.getAllUsers();
    }

    @Override
    public boolean joinUser(JoinRequest joinRequest) {
        User user = User.builder()
                .email(joinRequest.getEmail())
                .password(passwordEncoder.encode(joinRequest.getPassword()))
                .nickname(joinRequest.getNickname())
                .profile(null)
                .build();


        userDAO.saveUser(user);
        return true;
    }
    @Override
    public boolean comparePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            return false;
        }
        return true;
    }
    @Override
    public boolean isEmailExists(String email){
        return userDAO.existsByEmail(email);
    }
    @Override
    public User getUserByEmail(String email) {
        return userDAO.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }

    @Override
    public void resignUser(String email) {
        if (!userDAO.existsByEmail(email)) {
            throw new IllegalArgumentException("User with email " + email + " does not exist.");
        }
        userDAO.deleteByEmail(email);
    }

    @Override
    public String generateToken(String email) {
        return jwtTokenProvider.createToken(email);
    }

    @Override
    public User userDetail(String email) {
        return userDAO.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));
    }
}
