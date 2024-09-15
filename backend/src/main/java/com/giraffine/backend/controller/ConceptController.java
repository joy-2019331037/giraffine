package com.giraffine.backend.controller;

import com.giraffine.backend.model.Concept;
import com.giraffine.backend.service.ConceptService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/concepts")
@CrossOrigin(origins = "http://localhost:3000")
public class ConceptController {

    @Autowired
    private ConceptService conceptService;

    // Create a new concept
    @PostMapping("/add")
    public ResponseEntity<Concept> createConcept(@RequestBody Concept concept) {
        Concept savedConcept = conceptService.saveConcept(concept);
        return ResponseEntity.ok(savedConcept);
    }

    // Get all concepts
    @GetMapping("/getAllConcepts")
    public List<Concept> getAllConcepts() {
        return conceptService.getAllConcepts();
    }

    // Get concept by ID
    @GetMapping("/getConceptById/{id}")
    public ResponseEntity<Concept> getConceptById(@PathVariable String id) {
        Concept concept = conceptService.getConceptById(id).orElseThrow(() -> new RuntimeException("Concept not found"));
        return ResponseEntity.ok(concept);
    }

    // Update a concept
    @PutMapping("/{id}")
    public ResponseEntity<Concept> updateConcept(@PathVariable String id, @RequestBody Concept conceptDetails) {
        Concept updatedConcept = conceptService.updateConcept(id, conceptDetails);
        return ResponseEntity.ok(updatedConcept);
    }

    // Delete a concept
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteConcept(@PathVariable String id) {
        conceptService.deleteConcept(id);
        return ResponseEntity.noContent().build();
    }
}
