package com.lapzone.service;

import com.lapzone.dto.RegisterRequest;
import com.lapzone.entity.User;
import com.lapzone.repository.UserRepository;

import com.lapzone.dto.LoginRequest;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class AuthService {

    private final UserRepository userRepository;

    private final BCryptPasswordEncoder passwordEncoder =
            new BCryptPasswordEncoder();

    public AuthService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    public User register(RegisterRequest request) {

        // Check if user already exists
        if (userRepository.findByEmail(request.getEmail()).isPresent()) {
            throw new RuntimeException("User already exists");
        }

        // Create new user
        User user = new User();

        user.setName(request.getName());
        user.setEmail(request.getEmail().toLowerCase());
        user.setPassword(
                passwordEncoder.encode(request.getPassword())
        );

        // Save user
        return userRepository.save(user);
    }

    public User login(LoginRequest request) {

        User user = userRepository
                .findByEmail(request.getEmail().toLowerCase())
                .orElseThrow(() ->
                        new RuntimeException("Invalid Email or Password")
                );

        boolean passwordMatch = passwordEncoder.matches(
                request.getPassword(),
                user.getPassword()
        );

        if (!passwordMatch) {
            throw new RuntimeException("Invalid Email or Password");
        }

        return user;
    }
}