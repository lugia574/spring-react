package com.back.back.service;

import com.back.back.entity.User;
import com.back.back.repository.UserRepository;
import com.back.back.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
@RequiredArgsConstructor
@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private JwtTokenProvider jwtTokenProvider;



    public List<User> getUserApi(){
        try {
            return userRepository.findAll();
        }catch (Exception err){
            throw err;
        }
    }

    public boolean createUser(User user){
        if (userRepository.existsByEmail(user.getEmail())) {
//            throw new IllegalArgumentException("Email already exists");
            return false;
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return true;
    }

    public String userLogin(String email, String password){
        User user = userRepository.findByEmail(email).orElseThrow(() -> new IllegalArgumentException("Invalid username or password"));
        if(!passwordEncoder.matches(password, user.getPassword())){
            throw new IllegalArgumentException("Invalid email or password");
        }
        // 토큰 생성후 return
        return jwtTokenProvider.createToken(email);
    }

    public User userDetail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));

    }
}
