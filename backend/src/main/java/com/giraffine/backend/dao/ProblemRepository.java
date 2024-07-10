package com.giraffine.backend.dao;

import com.giraffine.backend.model.OTP;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.giraffine.backend.model.Problem;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProblemRepository extends MongoRepository<Problem, String> {
	List<Problem> findByLevel(String level);
}