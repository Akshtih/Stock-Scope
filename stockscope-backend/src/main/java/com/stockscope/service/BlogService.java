package com.stockscope.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscope.model.Blog;
import com.stockscope.repository.BlogRepository;

@Service
public class BlogService {
    
    @Autowired
    private BlogRepository blogRepository;
    
    // Get all blogs
    public List<Blog> getAllBlogs() {
        return blogRepository.findAll();
    }
    
    // Get blog by ID
    public Optional<Blog> getBlogById(String id) {
        return blogRepository.findById(id);
    }
    
    // Get blogs by category
    public List<Blog> getBlogsByCategory(String category) {
        return blogRepository.findByCategory(category);
    }
    
    // Get published blogs
    public List<Blog> getPublishedBlogs() {
        return blogRepository.findByIsPublished(true);
    }
    
    // Get blogs by author
    public List<Blog> getBlogsByAuthor(String author) {
        return blogRepository.findByAuthor(author);
    }
    
    // Create new blog
    public Blog createBlog(Blog blog) {
        blog.setCreatedAt(LocalDateTime.now());
        blog.setUpdatedAt(LocalDateTime.now());
        return blogRepository.save(blog);
    }
    
    // Update blog
    public Blog updateBlog(String id, Blog blogDetails) {
        Optional<Blog> existingBlog = blogRepository.findById(id);
        if (existingBlog.isPresent()) {
            Blog blog = existingBlog.get();
            blog.setTitle(blogDetails.getTitle());
            blog.setContent(blogDetails.getContent());
            blog.setCategory(blogDetails.getCategory());
            blog.setAuthor(blogDetails.getAuthor());
            blog.setImageUrl(blogDetails.getImageUrl());
            blog.setSummary(blogDetails.getSummary());
            blog.setReadTime(blogDetails.getReadTime());
            blog.setIsPublished(blogDetails.getIsPublished());
            blog.setUpdatedAt(LocalDateTime.now());
            return blogRepository.save(blog);
        }
        return null;
    }
    
    // Delete blog
    public boolean deleteBlog(String id) {
        if (blogRepository.existsById(id)) {
            blogRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
