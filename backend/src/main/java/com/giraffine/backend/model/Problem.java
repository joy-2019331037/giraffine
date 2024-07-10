package com.giraffine.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

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
    private String input;
    private String output;
    private String hint;

}
