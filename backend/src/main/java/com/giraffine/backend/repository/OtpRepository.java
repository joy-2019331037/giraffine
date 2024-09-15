package com.giraffine.backend.repository;

import com.giraffine.backend.model.OTP;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface OtpRepository extends MongoRepository<OTP, ObjectId> {
    Optional<OTP> findByEmail(String email);
}
