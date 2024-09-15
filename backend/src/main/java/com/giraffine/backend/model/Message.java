package com.giraffine.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

import java.time.LocalDateTime;

@Document(collection = "messages")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Message {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId id;

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId senderId;

    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId receiverId;

    private String content;
    private String senderName;
    private LocalDateTime timestamp;

    public Message(ObjectId senderId, String senderName, ObjectId receiverId, String content) {
        this.senderId = senderId;
        this.senderName=senderName;
        this.receiverId = receiverId;
        this.content = content;
        this.timestamp = LocalDateTime.now();
    }
}
