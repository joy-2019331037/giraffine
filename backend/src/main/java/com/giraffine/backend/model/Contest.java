package com.giraffine.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Document(collection = "contests")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Contest {
    
    @Id
    private String id;
    private String level;
    private String round;
    private String status;
    private LocalDateTime startTime;
    private LocalDateTime endTime;
    private int numberOfProblems;
    private List<ContestProblem> problemSet; 
    private int numberOfParticipants;
    private List<User> participants;  
    private List<Submission> submissions;  
    private boolean ratingsUpdated;
}
