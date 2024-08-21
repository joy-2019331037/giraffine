package com.giraffine.backend.dao;

import com.giraffine.backend.model.Contest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContestRepository extends MongoRepository<Contest, String> {
}
