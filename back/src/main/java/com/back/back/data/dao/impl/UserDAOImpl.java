package com.back.back.data.dao.impl;

import com.back.back.data.dao.UserDAO;
import com.back.back.data.entity.UserEntity;
import com.back.back.data.repository.UserRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public class UserDAOImpl implements UserDAO {

    private final UserRepository userRepository;

    public UserDAOImpl(UserRepository userRepository) {
        this.userRepository = userRepository;
    }
    @Override
    public List<UserEntity> getAllUsers() {
        return userRepository.findAll();
    }

    @Override
    public void saveUser(UserEntity user) {
        userRepository.save(user);
    }

    @Override
    public boolean existsByEmail(String email) {
        return userRepository.existsByEmail(email);
    }

    @Override
    public Optional<UserEntity> findByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    @Override
    public void deleteByEmail(String email) {
        userRepository.deleteByEmail(email);
    }
}
