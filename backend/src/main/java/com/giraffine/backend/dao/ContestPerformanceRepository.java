package com.giraffine.backend.dao;

import com.giraffine.backend.model.ContestPerformance;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ContestPerformanceRepository extends MongoRepository<ContestPerformance, String> {
    List<ContestPerformance> findByUserId(String userId);
}
