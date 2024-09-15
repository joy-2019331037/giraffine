package com.giraffine.backend.repository;

import com.giraffine.backend.model.Submission;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface SubmissionRepository extends MongoRepository<Submission, String> {
    List<Submission> findAllByUserId(String userId);
    List<Submission> findByUserIdAndProblemId(String userId, String problemId); 
}
