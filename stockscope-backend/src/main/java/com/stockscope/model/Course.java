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
@Document(collection = "courses")
public class Course {
    
    @Id
    private String id;
    
    private String title;
    private String description;
    private String category; // Novice, Investor, Trader
    private String imageUrl;
    private String difficulty; // Beginner, Intermediate, Advanced
    private Integer duration; // Duration in minutes
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    // Constructor without ID (for creating new courses)
    public Course(String title, String description, String category, String imageUrl, 
                  String difficulty, Integer duration, Boolean isActive) {
        this.title = title;
        this.description = description;
        this.category = category;
        this.imageUrl = imageUrl;
        this.difficulty = difficulty;
        this.duration = duration;
        this.isActive = isActive;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
