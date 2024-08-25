package com.giraffine.backend.dao;

import com.giraffine.backend.model.Contest;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

public interface ContestRepository extends MongoRepository<Contest, String> {
    List<Contest> findContestsByStatus(String status);
    List<Contest> findByStatusNot(String status);
}
