package com.spendwise.backend.controller;

import java.util.Optional;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spendwise.backend.dto.LoginRequest;
import com.spendwise.backend.dto.LoginResponse;
import com.spendwise.backend.entity.User;
import com.spendwise.backend.service.UserService;
import com.spendwise.backend.util.ApiResponse;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@Tag(
    name = "Authentication",
    description = "Authentication APIs for user login"
)
public class AuthController {

    private static final Logger logger =
            LoggerFactory.getLogger(AuthController.class);

    private final UserService userService;

    public AuthController(UserService userService) {
        this.userService = userService;
    }

    @Operation(
            summary = "User Login",
            description = "Authenticate user using username and password"
    )
    @ApiResponses(value = {
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "200",
                    description = "Login Successful"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "400",
                    description = "Invalid Credentials"
            ),
            @io.swagger.v3.oas.annotations.responses.ApiResponse(
                    responseCode = "500",
                    description = "Internal Server Error"
            )
    })
    @PostMapping("/login")
    public ApiResponse<LoginResponse> login(@Valid @RequestBody LoginRequest request) {

        logger.info("Login request received for username '{}'", request.getUsername());

        Optional<User> user = userService.getUserByUsername(request.getUsername());

        if (user.isPresent()
                && user.get().getPassword().equals(request.getPassword())) {

            logger.info("User '{}' logged in successfully", request.getUsername());

            LoginResponse response = new LoginResponse(
                    user.get().getUsername(),
                    user.get().getRole()
            );

            return new ApiResponse<>(
                    true,
                    "Login Successful",
                    response
            );
        }

        logger.warn("Invalid login attempt for '{}'", request.getUsername());

        return new ApiResponse<>(
                false,
                "Invalid Username or Password",
                null
        );
    }
}