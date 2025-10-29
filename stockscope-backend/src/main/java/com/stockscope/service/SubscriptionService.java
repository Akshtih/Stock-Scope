package com.stockscope.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscope.model.Subscription;
import com.stockscope.repository.SubscriptionRepository;

@Service
public class SubscriptionService {
    
    @Autowired
    private SubscriptionRepository subscriptionRepository;
    
    // Get all subscriptions
    public List<Subscription> getAllSubscriptions() {
        return subscriptionRepository.findAll();
    }
    
    // Get subscription by ID
    public Optional<Subscription> getSubscriptionById(String id) {
        return subscriptionRepository.findById(id);
    }
    
    // Get subscription by email
    public Optional<Subscription> getSubscriptionByEmail(String email) {
        return subscriptionRepository.findByEmail(email);
    }
    
    // Get active subscriptions
    public List<Subscription> getActiveSubscriptions() {
        return subscriptionRepository.findByIsActive(true);
    }
    
    // Create new subscription
    public Subscription subscribe(String email) {
        // Check if email already subscribed
        if (subscriptionRepository.existsByEmail(email)) {
            throw new RuntimeException("Email already subscribed");
        }
        
        Subscription subscription = new Subscription();
        subscription.setEmail(email);
        subscription.setIsActive(true);
        subscription.setSubscribedAt(LocalDateTime.now());
        return subscriptionRepository.save(subscription);
    }
    
    // Unsubscribe
    public boolean unsubscribe(String email) {
        Optional<Subscription> subscription = subscriptionRepository.findByEmail(email);
        if (subscription.isPresent()) {
            Subscription sub = subscription.get();
            sub.setIsActive(false);
            subscriptionRepository.save(sub);
            return true;
        }
        return false;
    }
    
    // Delete subscription
    public boolean deleteSubscription(String id) {
        if (subscriptionRepository.existsById(id)) {
            subscriptionRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
