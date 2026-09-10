package com.lapzone.repository;

import com.lapzone.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {

    Optional<User> findByEmail(String email);

    long countByRole(User.Role role);

    List<User> findByRoleOrderByCreatedAtDesc(User.Role role);
}