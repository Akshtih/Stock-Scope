package com.stockscope.service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.stockscope.model.Dictionary;
import com.stockscope.repository.DictionaryRepository;

@Service
public class DictionaryService {
    
    @Autowired
    private DictionaryRepository dictionaryRepository;
    
    // Get all dictionary terms
    public List<Dictionary> getAllTerms() {
        return dictionaryRepository.findAll();
    }
    
    // Get term by ID
    public Optional<Dictionary> getTermById(String id) {
        return dictionaryRepository.findById(id);
    }
    
    // Get term by exact name
    public Optional<Dictionary> getTermByName(String term) {
        return dictionaryRepository.findByTerm(term);
    }
    
    // Search terms (case insensitive)
    public List<Dictionary> searchTerms(String searchText) {
        return dictionaryRepository.findByTermContainingIgnoreCase(searchText);
    }
    
    // Search in definitions
    public List<Dictionary> searchInDefinitions(String searchText) {
        return dictionaryRepository.findByDefinitionContainingIgnoreCase(searchText);
    }
    
    // Get terms by category
    public List<Dictionary> getTermsByCategory(String category) {
        return dictionaryRepository.findByCategory(category);
    }
    
    // Create new term
    public Dictionary createTerm(Dictionary dictionary) {
        dictionary.setCreatedAt(LocalDateTime.now());
        dictionary.setUpdatedAt(LocalDateTime.now());
        return dictionaryRepository.save(dictionary);
    }
    
    // Update term
    public Dictionary updateTerm(String id, Dictionary dictionaryDetails) {
        Optional<Dictionary> existingTerm = dictionaryRepository.findById(id);
        if (existingTerm.isPresent()) {
            Dictionary dictionary = existingTerm.get();
            dictionary.setTerm(dictionaryDetails.getTerm());
            dictionary.setDefinition(dictionaryDetails.getDefinition());
            dictionary.setCategory(dictionaryDetails.getCategory());
            dictionary.setExample(dictionaryDetails.getExample());
            dictionary.setRelatedTerms(dictionaryDetails.getRelatedTerms());
            dictionary.setUpdatedAt(LocalDateTime.now());
            return dictionaryRepository.save(dictionary);
        }
        return null;
    }
    
    // Delete term
    public boolean deleteTerm(String id) {
        if (dictionaryRepository.existsById(id)) {
            dictionaryRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
