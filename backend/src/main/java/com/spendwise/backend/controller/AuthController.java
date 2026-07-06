package com.spendwise.backend.controller;

import java.util.Optional;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.LoginRequest;
import com.spendwise.backend.dto.LoginResponse;
import com.spendwise.backend.entity.User;
import com.spendwise.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        Optional<User> user = userService.getUserByUsername(request.getUsername());

        if (user.isPresent()
                && user.get().getPassword().equals(request.getPassword())) {

            return new LoginResponse(
                    true,
                    "Login Successful",
                    user.get().getUsername(),
                    user.get().getRole()
            );
        }

        return new LoginResponse(
                false,
                "Invalid Username or Password",
                null,
                null
        );
    }
}