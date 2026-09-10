package com.lapzone.security;

import com.lapzone.entity.User;
import com.lapzone.repository.UserRepository;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import org.springframework.stereotype.Component;

import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;

@Component
public class JwtAuthenticationFilter
        extends OncePerRequestFilter {

    private final JwtUtil jwtUtil;
    private final UserRepository userRepository;

    public JwtAuthenticationFilter(
            JwtUtil jwtUtil,
            UserRepository userRepository
    ) {
        this.jwtUtil = jwtUtil;
        this.userRepository = userRepository;
    }

    @Override
    protected void doFilterInternal(
            HttpServletRequest request,
            HttpServletResponse response,
            FilterChain filterChain
    ) throws ServletException, IOException {

        String authHeader =
                request.getHeader("Authorization");


        // Check Bearer Token
        if (
                authHeader != null &&
                        authHeader.startsWith("Bearer ")
        ) {

            String token =
                    authHeader.substring(7);

            try {

                // Get user ID from JWT
                Long userId =
                        jwtUtil.getUserId(token);


                // Find user in database
                User user =
                        userRepository
                                .findById(userId)
                                .orElse(null);


                if (user != null) {

                    /*
                     * Convert database role:
                     *
                     * admin → ROLE_ADMIN
                     * user  → ROLE_USER
                     */

                    String role =
                            user.getRole()
                                    .name()
                                    .toUpperCase();

                    SimpleGrantedAuthority authority =
                            new SimpleGrantedAuthority(
                                    "ROLE_" + role
                            );


                    UsernamePasswordAuthenticationToken authentication =
                            new UsernamePasswordAuthenticationToken(
                                    user,
                                    null,
                                    List.of(authority)
                            );


                    SecurityContextHolder
                            .getContext()
                            .setAuthentication(
                                    authentication
                            );
                }

            } catch (Exception e) {

                SecurityContextHolder
                        .clearContext();

            }
        }


        filterChain.doFilter(
                request,
                response
        );
    }
}