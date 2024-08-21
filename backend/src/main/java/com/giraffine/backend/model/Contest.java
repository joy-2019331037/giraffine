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
    private List<Problem> problemSet;  // List of problems
    private int numberOfParticipants;
    private List<User> participants;  // List of User objects
    private List<Submission> submissions;  // List of Submission objects

    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Problem {
        private String id;
        
        
        private String level;
        private String title;
        private String description;
        private String hint;
        private String solution;
        private String constraints;
        private List<TestCase> testCases;
        private int timeLimit;  // Time limit in seconds
        private int memoryLimit;  // Memory limit in MB

        @Data
        @NoArgsConstructor
        @AllArgsConstructor
        public static class TestCase {
            private String input;
            private String expectedOutput;
        }
    }
}
