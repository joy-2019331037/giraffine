package com.giraffine.backend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

@Document(collection = "submissions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Submission {

    @Id
    private String id;
    private String userId;
    private String problemId;  // Added problemId field
    private String submittedCode;
    private LocalDateTime timeAndDate;
    private String language;
    private String verdict;
}
