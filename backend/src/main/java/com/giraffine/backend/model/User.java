package com.giraffine.backend.model;

import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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
    private String activeStatus;
    private int rating;
    private int ratingIncrement;
    private Set<ObjectId> friends = new HashSet<>();
    private Set<ObjectId> friendRequests = new HashSet<>();

    private String email;
    private String password;
    private boolean isVerified;

    private Map<String, Set<String>> levelProgress = new HashMap<>();

    {
        levelProgress.put("Learner", new HashSet<>());
        levelProgress.put("Explorer", new HashSet<>());
        levelProgress.put("Adventurer", new HashSet<>());
        levelProgress.put("Challenger", new HashSet<>());
        levelProgress.put("Mastermind", new HashSet<>());
    }

    public String solveProblem(String level, String problemId) {
        Set<String> solvedProblems = levelProgress.getOrDefault(level, new HashSet<>());

        if (!solvedProblems.contains(problemId)) {
            solvedProblems.add(problemId);
            levelProgress.put(level, solvedProblems);
        }

        String message;

        if (level.equals(rank) && solvedProblems.size() == 10) {
            message = "Congratulations! You've solved all problems in " + level + "!";
        } else {
            message = "Problem " + problemId + " solved! Your current progress in " + level + " level is " + solvedProblems.size() + "/10.";
        }

        return message;
    }

    // Additional methods for friends management
    public void sendFriendRequest(ObjectId friendId) {
        friendRequests.add(friendId);
    }

    public void acceptFriendRequest(ObjectId friendId) {
        if (friendRequests.contains(friendId)) {
            friends.add(friendId);
            friendRequests.remove(friendId);
        }
    }

    public void removeFriend(ObjectId friendId) {
        friends.remove(friendId);
    }
}
