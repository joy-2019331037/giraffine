package com.giraffine.backend.service;

import com.giraffine.backend.model.Contest;
import com.giraffine.backend.model.Submission;
import com.giraffine.backend.dao.SubmissionRepository;
import com.giraffine.backend.dao.ContestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestParam;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class SubmissionService {
    // do not remove from line 12 to 18
    private final SubmissionRepository submissionRepository;

    @Autowired
    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    @Autowired
    private ContestRepository contestRepository;


    public Submission submitCode(String userId, String submittedBy, String problemId, String code, String language, String verdict,
            String message, String failedTestCaseInput,
            String failedTestCaseExpectedOutput,
            String failedTestCaseUserOutput) {
        Submission submission = new Submission();
        submission.setUserId(userId);
        submission.setSubmittedBy(submittedBy);
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


    public Submission submitContestProblem(String contestId, Submission submission) {
        // Save the submission
        Submission savedSubmission = submissionRepository.save(submission);

        // Retrieve the contest by ID
        Optional<Contest> contestOptional = contestRepository.findById(contestId);
        System.out.println(contestId);

        if (contestOptional.isPresent()) {
            Contest contest = contestOptional.get();

            // Add the submission to the contest's submission list
            contest.getSubmissions().add(savedSubmission);

            // Update the contest in the database
            contestRepository.save(contest);
        } else {
            throw new RuntimeException("Contest not found with id: " + contestId);
        }

        return savedSubmission;
    }
}
