package com.stockscope.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscope.model.User;
import com.stockscope.repository.UserRepository;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    // Get all users
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // Get user by ID
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }
    
    // Get user by email
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // Get user by mobile
    public Optional<User> getUserByMobile(String mobile) {
        return userRepository.findByMobile(mobile);
    }
    
    // Register new user
    public User registerUser(User user) {
        // Check if email or mobile already exists
        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already registered");
        }
        if (userRepository.existsByMobile(user.getMobile())) {
            throw new RuntimeException("Mobile number already registered");
        }
        
        user.setRegisteredAt(LocalDateTime.now());
        user.setLastLogin(LocalDateTime.now());
        user.setIsActive(true);
        return userRepository.save(user);
    }
    
    // Login user (basic authentication)
    public User loginUser(String mobile, String password) {
        Optional<User> user = userRepository.findByMobile(mobile);
        if (user.isPresent() && user.get().getPassword().equals(password)) {
            User loggedInUser = user.get();
            loggedInUser.setLastLogin(LocalDateTime.now());
            return userRepository.save(loggedInUser);
        }
        throw new RuntimeException("Invalid credentials");
    }
    
    // Update user
    public User updateUser(String id, User userDetails) {
        Optional<User> existingUser = userRepository.findById(id);
        if (existingUser.isPresent()) {
            User user = existingUser.get();
            user.setName(userDetails.getName());
            user.setEmail(userDetails.getEmail());
            user.setMobile(userDetails.getMobile());
            user.setUserType(userDetails.getUserType());
            user.setIsActive(userDetails.getIsActive());
            return userRepository.save(user);
        }
        return null;
    }
    
    // Delete user
    public boolean deleteUser(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
