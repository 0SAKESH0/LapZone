package com.lapzone.controller;

import com.lapzone.dto.LoginRequest;
import com.lapzone.dto.RegisterRequest;
import com.lapzone.entity.User;
import com.lapzone.security.JwtUtil;
import com.lapzone.service.AuthService;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    public AuthController(
            AuthService authService,
            JwtUtil jwtUtil
    ) {
        this.authService = authService;
        this.jwtUtil = jwtUtil;
    }


    // =========================
    // REGISTER
    // =========================

    @PostMapping("/register")
    public ResponseEntity<?> register(
            @RequestBody RegisterRequest request
    ) {

        try {

            User user = authService.register(request);

            return ResponseEntity
                    .status(HttpStatus.CREATED)
                    .body(
                            new RegisterResponse(
                                    "Registration Successful",
                                    new UserResponse(
                                            user.getId(),
                                            user.getName(),
                                            user.getEmail(),
                                            user.getRole().name()
                                    )
                            )
                    );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // =========================
    // LOGIN
    // =========================

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request
    ) {

        try {

            User user = authService.login(request);

            String token =
                    jwtUtil.generateToken(user.getId());

            return ResponseEntity.ok(
                    new LoginResponse(
                            "Login Successful",
                            token,
                            new UserResponse(
                                    user.getId(),
                                    user.getName(),
                                    user.getEmail(),
                                    user.getRole().name()
                            )
                    )
            );

        } catch (RuntimeException e) {

            return ResponseEntity
                    .badRequest()
                    .body(
                            new ErrorResponse(
                                    e.getMessage()
                            )
                    );
        }
    }


    // =========================
    // PROFILE
    // =========================

    @GetMapping("/profile")
    public ResponseEntity<?> profile(
            org.springframework.security.core.Authentication authentication
    ) {

        User user =
                (User) authentication.getPrincipal();

        return ResponseEntity.ok(
                new UserResponse(
                        user.getId(),
                        user.getName(),
                        user.getEmail(),
                        user.getRole().name()
                )
        );
    }


    // =========================
    // REGISTER RESPONSE
    // =========================

    static class RegisterResponse {

        private String message;
        private UserResponse user;

        public RegisterResponse(
                String message,
                UserResponse user
        ) {
            this.message = message;
            this.user = user;
        }

        public String getMessage() {
            return message;
        }

        public UserResponse getUser() {
            return user;
        }
    }


    // =========================
    // LOGIN RESPONSE
    // =========================

    static class LoginResponse {

        private String message;
        private String token;
        private UserResponse user;

        public LoginResponse(
                String message,
                String token,
                UserResponse user
        ) {
            this.message = message;
            this.token = token;
            this.user = user;
        }

        public String getMessage() {
            return message;
        }

        public String getToken() {
            return token;
        }

        public UserResponse getUser() {
            return user;
        }
    }


    // =========================
    // USER RESPONSE
    // =========================

    static class UserResponse {

        private Long id;
        private String name;
        private String email;
        private String role;

        public UserResponse(
                Long id,
                String name,
                String email,
                String role
        ) {
            this.id = id;
            this.name = name;
            this.email = email;
            this.role = role;
        }

        public Long getId() {
            return id;
        }

        public String getName() {
            return name;
        }

        public String getEmail() {
            return email;
        }

        public String getRole() {
            return role;
        }
    }


    // =========================
    // ERROR RESPONSE
    // =========================

    static class ErrorResponse {

        private String message;

        public ErrorResponse(String message) {
            this.message = message;
        }

        public String getMessage() {
            return message;
        }
    }
}