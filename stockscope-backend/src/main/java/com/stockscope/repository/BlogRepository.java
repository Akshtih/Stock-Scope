package com.stockscope.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stockscope.model.Blog;

@Repository
public interface BlogRepository extends MongoRepository<Blog, String> {
    
    // Find blogs by category (Blogs, What's Brewing, Stories)
    List<Blog> findByCategory(String category);
    
    // Find published blogs
    List<Blog> findByIsPublished(Boolean isPublished);
    
    // Find blogs by author
    List<Blog> findByAuthor(String author);
    
    // Find blogs by category and published status
    List<Blog> findByCategoryAndIsPublished(String category, Boolean isPublished);
}
