package com.giraffine.backend.repository;

import java.util.Optional;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.giraffine.backend.model.User;

@Repository
public interface UserRepository extends MongoRepository<User,ObjectId>{
    Optional<User> findByEmail(String email);
}
