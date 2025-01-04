package com.back.back.service;

import com.back.back.dto.auth.JoinRequest;
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

    public boolean joinUser(JoinRequest joinRequest){
        User user = new User();
        user.setEmail(joinRequest.getEmail());
        user.setPassword(passwordEncoder.encode(joinRequest.getPassword()));
        user.setNickname(joinRequest.getNickname());
        user.setProfile(null);

        userRepository.save(user);
        return true;
    }

    public User getUserByEmail(String email) {
        return userRepository.findByEmail(email)
                .orElseThrow(() -> new IllegalArgumentException("Invalid email or password"));
    }

    public boolean isEmailExists(String email){
        return userRepository.existsByEmail(email);
    }

    public boolean comparePassword(String rawPassword, String encodedPassword) {
        if (!passwordEncoder.matches(rawPassword, encodedPassword)) {
            return false;
        }
        return true;
    }


    public String generateToken(String email) {
        return jwtTokenProvider.createToken(email);
    }



    public User userDetail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));

    }
}
