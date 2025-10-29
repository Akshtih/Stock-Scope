package com.stockscope.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stockscope.model.Subscription;

@Repository
public interface SubscriptionRepository extends MongoRepository<Subscription, String> {
    
    // Find subscription by email
    Optional<Subscription> findByEmail(String email);
    
    // Find active subscriptions
    List<Subscription> findByIsActive(Boolean isActive);
    
    // Check if email is already subscribed
    boolean existsByEmail(String email);
}
