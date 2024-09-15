package com.giraffine.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Document(collection = "concepts") // MongoDB collection name
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Concept {

    @Id
    private String id; // Unique ID for the concept
    private String title; // Title of the concept
    private String description; // Brief description of the concept
    private String example; // Real-life or fun example
    private String codeExample; // C++ code example
    private String explanation; // Explanation of the code example
    private String realWorldUsage; // How this concept is used in real-world applications
    private String visualRepresentation; // URL to a related image
    private String potentialMistakes; // Common mistakes when learning this concept
    private String funFact; // Fun fact related to the concept
    private String learningObjective; // What the learner should achieve
    private List<String> relatedConcepts; // List of related concepts
}
