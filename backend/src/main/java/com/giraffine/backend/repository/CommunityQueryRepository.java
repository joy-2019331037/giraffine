package com.giraffine.backend.repository;

import com.giraffine.backend.model.CommunityQuery;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommunityQueryRepository extends MongoRepository<CommunityQuery, String> {
    // Custom query methods can be added if needed
}
