package com.stockscope.model;

import java.time.LocalDateTime;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "users")
public class User {
    
    @Id
    private String id;
    
    private String name;
    private String email;
    private String mobile;
    private String password; // In production, use encrypted password
    private String userType; // Novice, Investor, Trader
    private Boolean isActive;
    private LocalDateTime registeredAt;
    private LocalDateTime lastLogin;
    
    public User(String name, String email, String mobile, String password, 
                String userType, Boolean isActive) {
        this.name = name;
        this.email = email;
        this.mobile = mobile;
        this.password = password;
        this.userType = userType;
        this.isActive = isActive;
        this.registeredAt = LocalDateTime.now();
        this.lastLogin = LocalDateTime.now();
    }
}
