package com.giraffine.backend.model;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.HashSet;

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
    private int rating;
    private int ratingIncrement;
    private List<String> friends;

    private String email;
    private String password;
    private boolean isVerified;

    // Map to track the set of problems solved for each level
    private Map<String, Set<String>> levelProgress = new HashMap<>();

    // Initialize the levelProgress map with empty sets for all levels
    {
        levelProgress.put("Learner", new HashSet<>());
        levelProgress.put("Explorer", new HashSet<>());
        levelProgress.put("Adventurer", new HashSet<>());
        levelProgress.put("Challenger", new HashSet<>());
        levelProgress.put("Mastermind", new HashSet<>());
    }

    // Method to track which problem from a level has been solved
    public String solveProblem(String level, String problemId) {
        Set<String> solvedProblems = levelProgress.getOrDefault(level, new HashSet<>());

        // If the problem is not already solved
        if (!solvedProblems.contains(problemId)) {
            solvedProblems.add(problemId);
            levelProgress.put(level, solvedProblems);
        }

        String message;

        if (level.equals(rank) && solvedProblems.size() == 10) {
           
            message = "Congratulations! You've solved all problems in " + level +"!";
        } else {
            message = "Problem " + problemId + " solved! Your current progress in " + level + " level is " + solvedProblems.size() + "/10.";
        }

        return message;
    }

}
