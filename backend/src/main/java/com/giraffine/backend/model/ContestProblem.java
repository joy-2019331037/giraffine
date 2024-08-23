package com.giraffine.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ContestProblem {
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
