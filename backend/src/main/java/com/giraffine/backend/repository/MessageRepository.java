package com.giraffine.backend.repository;

import com.giraffine.backend.model.Message;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface MessageRepository extends MongoRepository<Message, ObjectId> {
    List<Message> findBySenderIdAndReceiverId(ObjectId senderId, ObjectId receiverId);
    List<Message> findByReceiverIdAndSenderId(ObjectId receiverId, ObjectId senderId);
    List<Message> findBySenderIdAndReceiverIdOrReceiverIdAndSenderId(ObjectId senderId, ObjectId receiverId, ObjectId receiverId2, ObjectId senderId2);
}
