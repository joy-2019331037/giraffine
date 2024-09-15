package com.giraffine.backend.repository;

import com.giraffine.backend.model.Concept;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConceptRepository extends MongoRepository<Concept, String> {
    // Custom query methods can be added here if needed
}
