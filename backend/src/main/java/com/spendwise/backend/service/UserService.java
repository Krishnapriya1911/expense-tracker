package com.spendwise.backend.service;

import java.util.List;
import java.util.Optional;

import com.spendwise.backend.entity.User;

public interface UserService {

    User saveUser(User user);

    List<User> getAllUsers();

    Optional<User> getUserById(Long id);

    Optional<User> getUserByUsername(String username);

    void deleteUser(Long id);
}