package com.giraffine.backend.dao;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import com.giraffine.backend.model.User;

@Repository
public interface UserDao extends MongoRepository<User,ObjectId>{
    
}
