package com.stockscope.controller;

import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.stockscope.model.Blog;
import com.stockscope.service.BlogService;

@RestController
@RequestMapping("/api/blogs")
public class BlogController {
    
    @Autowired
    private BlogService blogService;
    
    // GET: Get all blogs
    @GetMapping
    public ResponseEntity<List<Blog>> getAllBlogs() {
        List<Blog> blogs = blogService.getAllBlogs();
        return ResponseEntity.ok(blogs);
    }
    
    // GET: Get blog by ID
    @GetMapping("/{id}")
    public ResponseEntity<Blog> getBlogById(@PathVariable String id) {
        Optional<Blog> blog = blogService.getBlogById(id);
        return blog.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // GET: Get blogs by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Blog>> getBlogsByCategory(@PathVariable String category) {
        List<Blog> blogs = blogService.getBlogsByCategory(category);
        return ResponseEntity.ok(blogs);
    }
    
    // GET: Get published blogs
    @GetMapping("/published")
    public ResponseEntity<List<Blog>> getPublishedBlogs() {
        List<Blog> blogs = blogService.getPublishedBlogs();
        return ResponseEntity.ok(blogs);
    }
    
    // GET: Get blogs by author
    @GetMapping("/author/{author}")
    public ResponseEntity<List<Blog>> getBlogsByAuthor(@PathVariable String author) {
        List<Blog> blogs = blogService.getBlogsByAuthor(author);
        return ResponseEntity.ok(blogs);
    }
    
    // POST: Create new blog
    @PostMapping
    public ResponseEntity<Blog> createBlog(@RequestBody Blog blog) {
        Blog createdBlog = blogService.createBlog(blog);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdBlog);
    }
    
    // PUT: Update blog
    @PutMapping("/{id}")
    public ResponseEntity<Blog> updateBlog(@PathVariable String id, @RequestBody Blog blog) {
        Blog updatedBlog = blogService.updateBlog(id, blog);
        if (updatedBlog != null) {
            return ResponseEntity.ok(updatedBlog);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE: Delete blog
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteBlog(@PathVariable String id) {
        boolean deleted = blogService.deleteBlog(id);
        if (deleted) {
            return ResponseEntity.ok("Blog deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
