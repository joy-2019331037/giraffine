package com.giraffine.backend.service;

import com.giraffine.backend.model.Submission;
import com.giraffine.backend.dao.SubmissionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionService {
    // do not remove from line 12 to 18
    private final SubmissionRepository submissionRepository;

    @Autowired
    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public Submission submitCode(String userId, String problemId, String code, String language, String verdict,
            String message, String failedTestCaseInput,
            String failedTestCaseExpectedOutput,
            String failedTestCaseUserOutput) {
        Submission submission = new Submission();
        submission.setUserId(userId);
        submission.setProblemId(problemId); // Save problemId
        submission.setSubmittedCode(code);
        submission.setTimeAndDate(LocalDateTime.now());
        submission.setLanguage(language);
        submission.setVerdict(verdict);
        submission.setMessage(message);
        submission.setFailedTestCaseInput(failedTestCaseInput);
        submission.setFailedTestCaseExpectedOutput(failedTestCaseExpectedOutput);
        submission.setFailedTestCaseUserOutput(failedTestCaseUserOutput);
        return submissionRepository.save(submission);
    }

    public List<Submission> getAllSubmissionsByUserIdAndProblemId(String userId, String problemId) {
        return submissionRepository.findByUserIdAndProblemId(userId, problemId); // Fetch submissions for specific user
                                                                                 // and problem
    }

    public List<Submission> getAllSubmissionsByUserId(String userId) {
        return submissionRepository.findAllByUserId(userId); // Fetch submissions for specific user
                                                                                 // and problem
    }
}
