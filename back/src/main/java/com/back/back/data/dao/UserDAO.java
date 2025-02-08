package com.back.back.data.dao;

import com.back.back.data.entity.UserEntity;

import java.util.List;
import java.util.Optional;

public interface UserDAO {

    List<UserEntity> getAllUsers();
    void saveUser(UserEntity user);
    boolean existsByEmail(String email);
    Optional<UserEntity> findByEmail(String email);

    void deleteByEmail(String email);


}
