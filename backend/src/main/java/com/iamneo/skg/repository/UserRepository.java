package com.iamneo.skg.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.iamneo.skg.model.User;
import com.iamneo.skg.model.enumerated.Role;

public interface UserRepository extends JpaRepository<User, UUID> {
    Optional<User> findByEmail(String email);

    List<User> findAllByRole(Role role);

    Optional<User> findById(String id);
}
