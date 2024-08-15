package com.giraffine.backend.model;

import java.util.List;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.databind.ser.std.ToStringSerializer;

@Document(collection = "users")
@Data
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    @JsonSerialize(using = ToStringSerializer.class)
    private ObjectId _id;

    public String getId() {
        return _id != null ? _id.toHexString() : null;
    }

    public void setId(ObjectId _id) {
        this._id = _id;
    }
    
    private String firstName;
    private String lastName;
    private String rank;
    private List<String> friends;
    
    private String email;
    private String password;
    private boolean isVerified; // Add this field
}
