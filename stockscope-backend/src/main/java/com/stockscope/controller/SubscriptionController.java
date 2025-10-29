package com.stockscope.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import com.stockscope.model.Subscription;
import com.stockscope.service.SubscriptionService;

@RestController
@RequestMapping("/api/subscriptions")
public class SubscriptionController {
    
    @Autowired
    private SubscriptionService subscriptionService;
    
    // GET: Get all subscriptions
    @GetMapping
    public ResponseEntity<List<Subscription>> getAllSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getAllSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }
    
    // GET: Get active subscriptions
    @GetMapping("/active")
    public ResponseEntity<List<Subscription>> getActiveSubscriptions() {
        List<Subscription> subscriptions = subscriptionService.getActiveSubscriptions();
        return ResponseEntity.ok(subscriptions);
    }
    
    // POST: Subscribe new email
    @PostMapping
    public ResponseEntity<?> subscribe(@RequestBody Map<String, String> request) {
        try {
            String email = request.get("email");
            Subscription subscription = subscriptionService.subscribe(email);
            Map<String, Object> response = new HashMap<>();
            response.put("message", "Successfully subscribed!");
            response.put("subscription", subscription);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, String> error = new HashMap<>();
            error.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(error);
        }
    }
    
    // PUT: Unsubscribe
    @PutMapping("/unsubscribe")
    public ResponseEntity<?> unsubscribe(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        boolean unsubscribed = subscriptionService.unsubscribe(email);
        if (unsubscribed) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Successfully unsubscribed");
            return ResponseEntity.ok(response);
        }
        Map<String, String> error = new HashMap<>();
        error.put("error", "Email not found");
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(error);
    }
    
    // DELETE: Delete subscription
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteSubscription(@PathVariable String id) {
        boolean deleted = subscriptionService.deleteSubscription(id);
        if (deleted) {
            return ResponseEntity.ok("Subscription deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
