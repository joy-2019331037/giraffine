package com.giraffine.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Document(collection = "contest_performances")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestPerformance {
    
    @Id
    private String id;
    private String contestId;
    private String contestName;
    private String userId;
    private String userName;
    private int userPreviousRating;
    private int userCurrentRating;
    private int userRatingIncrement;
    private int noOfProblemsSolved;
}
