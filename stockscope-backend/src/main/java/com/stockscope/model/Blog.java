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
@Document(collection = "blogs")
public class Blog {
    
    @Id
    private String id;
    
    private String title;
    private String content;
    private String category; // Blogs, What's Brewing, Stories
    private String author;
    private String imageUrl;
    private String summary;
    private Integer readTime; // Reading time in minutes
    private Boolean isPublished;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Blog(String title, String content, String category, String author, 
                String imageUrl, String summary, Integer readTime, Boolean isPublished) {
        this.title = title;
        this.content = content;
        this.category = category;
        this.author = author;
        this.imageUrl = imageUrl;
        this.summary = summary;
        this.readTime = readTime;
        this.isPublished = isPublished;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
