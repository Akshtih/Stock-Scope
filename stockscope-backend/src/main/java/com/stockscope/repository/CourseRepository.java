package com.stockscope.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stockscope.model.Course;

@Repository
public interface CourseRepository extends MongoRepository<Course, String> {
    
    // Find courses by category (Novice, Investor, Trader)
    List<Course> findByCategory(String category);
    
    // Find active courses
    List<Course> findByIsActive(Boolean isActive);
    
    // Find courses by difficulty
    List<Course> findByDifficulty(String difficulty);
    
    // Find courses by category and active status
    List<Course> findByCategoryAndIsActive(String category, Boolean isActive);
}
