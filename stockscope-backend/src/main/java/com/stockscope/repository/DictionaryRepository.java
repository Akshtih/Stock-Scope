package com.stockscope.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.stockscope.model.Dictionary;

@Repository
public interface DictionaryRepository extends MongoRepository<Dictionary, String> {
    
    // Find term by exact match
    Optional<Dictionary> findByTerm(String term);
    
    // Find terms by category
    List<Dictionary> findByCategory(String category);
    
    // Find terms containing a search string (case insensitive)
    List<Dictionary> findByTermContainingIgnoreCase(String searchTerm);
    
    // Find terms where definition contains search string
    List<Dictionary> findByDefinitionContainingIgnoreCase(String searchText);
}
