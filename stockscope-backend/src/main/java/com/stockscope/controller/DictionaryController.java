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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.stockscope.model.Dictionary;
import com.stockscope.service.DictionaryService;

@RestController
@RequestMapping("/api/dictionary")
public class DictionaryController {
    
    @Autowired
    private DictionaryService dictionaryService;
    
    // GET: Get all terms
    @GetMapping
    public ResponseEntity<List<Dictionary>> getAllTerms() {
        List<Dictionary> terms = dictionaryService.getAllTerms();
        return ResponseEntity.ok(terms);
    }
    
    // GET: Get term by ID
    @GetMapping("/{id}")
    public ResponseEntity<Dictionary> getTermById(@PathVariable String id) {
        Optional<Dictionary> term = dictionaryService.getTermById(id);
        return term.map(ResponseEntity::ok)
                   .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // GET: Search terms
    @GetMapping("/search")
    public ResponseEntity<List<Dictionary>> searchTerms(@RequestParam String q) {
        List<Dictionary> terms = dictionaryService.searchTerms(q);
        return ResponseEntity.ok(terms);
    }
    
    // GET: Get terms by category
    @GetMapping("/category/{category}")
    public ResponseEntity<List<Dictionary>> getTermsByCategory(@PathVariable String category) {
        List<Dictionary> terms = dictionaryService.getTermsByCategory(category);
        return ResponseEntity.ok(terms);
    }
    
    // GET: Get term by exact name
    @GetMapping("/term/{term}")
    public ResponseEntity<Dictionary> getTermByName(@PathVariable String term) {
        Optional<Dictionary> dictionaryTerm = dictionaryService.getTermByName(term);
        return dictionaryTerm.map(ResponseEntity::ok)
                             .orElseGet(() -> ResponseEntity.notFound().build());
    }
    
    // POST: Create new term
    @PostMapping
    public ResponseEntity<Dictionary> createTerm(@RequestBody Dictionary dictionary) {
        Dictionary createdTerm = dictionaryService.createTerm(dictionary);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdTerm);
    }
    
    // PUT: Update term
    @PutMapping("/{id}")
    public ResponseEntity<Dictionary> updateTerm(@PathVariable String id, @RequestBody Dictionary dictionary) {
        Dictionary updatedTerm = dictionaryService.updateTerm(id, dictionary);
        if (updatedTerm != null) {
            return ResponseEntity.ok(updatedTerm);
        }
        return ResponseEntity.notFound().build();
    }
    
    // DELETE: Delete term
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTerm(@PathVariable String id) {
        boolean deleted = dictionaryService.deleteTerm(id);
        if (deleted) {
            return ResponseEntity.ok("Term deleted successfully");
        }
        return ResponseEntity.notFound().build();
    }
}
