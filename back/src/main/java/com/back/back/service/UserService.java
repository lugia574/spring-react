package com.back.back.service;

import com.back.back.entity.User;
import com.back.back.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserService {
    @Autowired
    private UserRepository userRepository;
    public List<User> getUserApi(){
        try {
            return userRepository.findAll();
        }catch (Exception err){
            throw err;
        }
    }

    public boolean createUser(User user){
        try {
            userRepository.save(user);
            return true;
        }catch (Exception err){
            throw err;
        }
    }

    public User userDetail(String email){
        return userRepository.findByEmail(email).orElseThrow(() -> new RuntimeException("User not found with email: " + email));

    }
}
