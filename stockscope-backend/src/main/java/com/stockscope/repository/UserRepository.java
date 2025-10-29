package com.stockscope.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stockscope.model.User;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    
    // Find user by email
    Optional<User> findByEmail(String email);
    
    // Find user by mobile
    Optional<User> findByMobile(String mobile);
    
    // Find users by type
    List<User> findByUserType(String userType);
    
    // Find active users
    List<User> findByIsActive(Boolean isActive);
    
    // Check if email exists
    boolean existsByEmail(String email);
    
    // Check if mobile exists
    boolean existsByMobile(String mobile);
}
