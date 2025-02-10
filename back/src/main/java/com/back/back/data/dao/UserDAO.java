package com.back.back.data.dao;

import com.back.back.data.entity.User;

import java.util.List;
import java.util.Optional;

public interface UserDAO {

    List<User> getAllUsers();
    void saveUser(User user);
    boolean existsByEmail(String email);
    Optional<User> findByEmail(String email);

    void deleteByEmail(String email);


}
