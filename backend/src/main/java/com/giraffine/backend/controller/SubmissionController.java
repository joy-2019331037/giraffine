package com.giraffine.backend.controller;

import com.giraffine.backend.model.Submission;
import com.giraffine.backend.service.SubmissionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/submissions")
public class SubmissionController {
    // do not remove from line 14 to 20
    private final SubmissionService submissionService;

    @Autowired
    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/submit")
    public ResponseEntity<Submission> submitCode(
            @RequestParam String userId,
            @RequestParam String submittedBy,
            @RequestParam String problemId, // Accept problemId
            @RequestParam String code,
            @RequestParam String language,
            @RequestParam String verdict,
            @RequestParam String message,
            @RequestParam String failedTestCaseInput,
            @RequestParam String failedTestCaseExpectedOutput,
            @RequestParam String failedTestCaseUserOutput) {

        Submission submission = submissionService.submitCode(userId, submittedBy, problemId, code, language, verdict, message,
                failedTestCaseInput, failedTestCaseExpectedOutput, failedTestCaseUserOutput);
        return ResponseEntity.ok(submission);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/user/{userId}/problem/{problemId}")
    public ResponseEntity<List<Submission>> getAllSubmissionsByUserIdAndProblemId(
            @PathVariable String userId,
            @PathVariable String problemId) {

        List<Submission> submissions = submissionService.getAllSubmissionsByUserIdAndProblemId(userId, problemId);
        return ResponseEntity.ok(submissions);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/getAllSubmissionsByUserId/{userId}")
    public ResponseEntity<List<Submission>> getAllSubmissions(@PathVariable String userId) {
        List<Submission> submissions = submissionService.getAllSubmissionsByUserId(userId);
        return ResponseEntity.ok(submissions);
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @PostMapping("/submit/contest/{contestId}")
    public ResponseEntity<Submission> submitContestProblem(@PathVariable String contestId, @RequestBody Submission submission) {
        Submission savedSubmission = submissionService.submitContestProblem(contestId, submission);
        return ResponseEntity.ok(savedSubmission);
    }
}
