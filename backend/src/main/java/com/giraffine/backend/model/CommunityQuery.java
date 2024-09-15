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
import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Document(collection = "communityQueries")
public class CommunityQuery {
    @Id
    private String id;
    private String title;
    private User postedBy; // Reference to the User model
    private LocalDateTime dateTime;
    private String description;
    private List<QuerySolution> solutions; // List of Query Solutions

    public CommunityQuery(User postedBy, LocalDateTime dateTime, String description,  String title, List<QuerySolution> solutions) {
        this.id = UUID.randomUUID().toString(); // Generate random string for ID
        this.postedBy = postedBy;
        this.dateTime = dateTime;
        this.description = description;
        this.solutions = solutions;
        this.title =title;
    }

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class QuerySolution {
        @Id
        private String id;
        private String description;
        private User proposedBy; // Reference to the User model
        private LocalDateTime dateTime;
        private int upVoteCount;
        private int downVoteCount;


        public QuerySolution(User proposedBy, LocalDateTime dateTime, String description,  int upVoteCount, int downVoteCount) {
            this.id = UUID.randomUUID().toString(); // Generate random string for ID
            this.proposedBy = proposedBy;
            this.dateTime = dateTime;
            this.description = description;
            this.upVoteCount = upVoteCount;
            this.downVoteCount =downVoteCount;
        }
    }
}
