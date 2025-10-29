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
@Document(collection = "subscriptions")
public class Subscription {
    
    @Id
    private String id;
    
    private String email;
    private Boolean isActive;
    private LocalDateTime subscribedAt;
    
    public Subscription(String email, Boolean isActive) {
        this.email = email;
        this.isActive = isActive;
        this.subscribedAt = LocalDateTime.now();
    }
}
