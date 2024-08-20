package com.giraffine.backend.model;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class SolveProblemResponse {
    private User user;
    private String message;
}
