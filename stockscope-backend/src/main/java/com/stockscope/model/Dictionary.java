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
@Document(collection = "dictionary")
public class Dictionary {
    
    @Id
    private String id;
    
    private String term;
    private String definition;
    private String category; // Stocks, Bonds, Derivatives, etc.
    private String example;
    private String relatedTerms;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public Dictionary(String term, String definition, String category, 
                      String example, String relatedTerms) {
        this.term = term;
        this.definition = definition;
        this.category = category;
        this.example = example;
        this.relatedTerms = relatedTerms;
        this.createdAt = LocalDateTime.now();
        this.updatedAt = LocalDateTime.now();
    }
}
