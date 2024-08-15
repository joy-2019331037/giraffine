package com.giraffine.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Document(collection = "problems")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Problem {
    
    @Id
    private String id;
    private String level;
    private String title;
    private String description;
    private String hint;
    private List<TestCase> testCases;  // List of test cases

    @Data
    @AllArgsConstructor
    @NoArgsConstructor
    public static class TestCase {
        private String input;
        private String expectedOutput;
    }
}
