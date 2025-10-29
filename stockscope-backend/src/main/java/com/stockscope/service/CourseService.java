package com.stockscope.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscope.model.Course;
import com.stockscope.repository.CourseRepository;

@Service
public class CourseService {
    
    @Autowired
    private CourseRepository courseRepository;
    
    // Get all courses
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }
    
    // Get course by ID
    public Optional<Course> getCourseById(String id) {
        return courseRepository.findById(id);
    }
    
    // Get courses by category
    public List<Course> getCoursesByCategory(String category) {
        return courseRepository.findByCategory(category);
    }
    
    // Get active courses
    public List<Course> getActiveCourses() {
        return courseRepository.findByIsActive(true);
    }
    
    // Get courses by difficulty
    public List<Course> getCoursesByDifficulty(String difficulty) {
        return courseRepository.findByDifficulty(difficulty);
    }
    
    // Create new course
    public Course createCourse(Course course) {
        course.setCreatedAt(LocalDateTime.now());
        course.setUpdatedAt(LocalDateTime.now());
        return courseRepository.save(course);
    }
    
    // Update course
    public Course updateCourse(String id, Course courseDetails) {
        Optional<Course> existingCourse = courseRepository.findById(id);
        if (existingCourse.isPresent()) {
            Course course = existingCourse.get();
            course.setTitle(courseDetails.getTitle());
            course.setDescription(courseDetails.getDescription());
            course.setCategory(courseDetails.getCategory());
            course.setImageUrl(courseDetails.getImageUrl());
            course.setDifficulty(courseDetails.getDifficulty());
            course.setDuration(courseDetails.getDuration());
            course.setIsActive(courseDetails.getIsActive());
            course.setUpdatedAt(LocalDateTime.now());
            return courseRepository.save(course);
        }
        return null;
    }
    
    // Delete course
    public boolean deleteCourse(String id) {
        if (courseRepository.existsById(id)) {
            courseRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
