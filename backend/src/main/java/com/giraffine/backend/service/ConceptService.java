package com.giraffine.backend.service;

import com.giraffine.backend.model.Concept;
import com.giraffine.backend.repository.ConceptRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ConceptService {

    @Autowired
    private ConceptRepository conceptRepository;

    // Save a new concept
    public Concept saveConcept(Concept concept) {
        return conceptRepository.save(concept);
    }

    // Get all concepts
    public List<Concept> getAllConcepts() {
        return conceptRepository.findAll();
    }

    // Get a concept by ID
    public Optional<Concept> getConceptById(String id) {
        return conceptRepository.findById(id);
    }

    // Update a concept by ID
    public Concept updateConcept(String id, Concept conceptDetails) {
        Concept concept = conceptRepository.findById(id).orElseThrow(() -> new RuntimeException("Concept not found"));
        concept.setTitle(conceptDetails.getTitle());
        concept.setDescription(conceptDetails.getDescription());
        concept.setExample(conceptDetails.getExample());
        concept.setCodeExample(conceptDetails.getCodeExample());
        concept.setExplanation(conceptDetails.getExplanation());
        concept.setRealWorldUsage(conceptDetails.getRealWorldUsage());
        concept.setVisualRepresentation(conceptDetails.getVisualRepresentation());
        concept.setPotentialMistakes(conceptDetails.getPotentialMistakes());
        concept.setFunFact(conceptDetails.getFunFact());
        concept.setLearningObjective(conceptDetails.getLearningObjective());
        concept.setRelatedConcepts(conceptDetails.getRelatedConcepts());
        return conceptRepository.save(concept);
    }

    // Delete a concept by ID
    public void deleteConcept(String id) {
        conceptRepository.deleteById(id);
    }
}
