package com.giraffine.backend.service;

import com.giraffine.backend.model.Contest;
import com.giraffine.backend.dao.ContestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.giraffine.backend.model.User;
import com.giraffine.backend.model.ContestProblem;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class ContestService {

    @Autowired
    private ContestRepository contestRepository;

    // Create a new contest
    public Contest createContest(Contest contest) {
        return contestRepository.save(contest);
    }

    // Fetch all contests
    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }

    // Fetch contest by ID
    public Contest getContestById(String id) {
        return contestRepository.findById(id).orElse(null);
    }

    // Register user to contest with a message if already registered
    public String registerUserToContest(String contestId, User user) {
        Optional<Contest> contestOptional = contestRepository.findById(contestId);

        if (contestOptional.isPresent()) {
            Contest contest = contestOptional.get();

            // Check if the user is already registered
            // boolean alreadyRegistered = contest.getParticipants().stream()
            // .anyMatch(participant -> participant.getId().equals(user.getId()));

            if (isUserRegistered(contestId, user.getId())) {

                return "You are already registered for this contest.";
            } else {
                contest.getParticipants().add(user); // Add user to participants list
                contest.setNumberOfParticipants(contest.getNumberOfParticipants() + 1); // Increment participant count
                contestRepository.save(contest); // Save updated contest
                String response = "Registration completed for contest " + contest.getLevel() + " Round "
                        + contest.getRound();
                return response;
            }
        }

        return "Contest not found.";
    }

    public boolean isUserRegistered(String contestId, String userId) {
        Optional<Contest> contestOptional = contestRepository.findById(contestId);

        if (contestOptional.isPresent()) {
            Contest contest = contestOptional.get();
            return contest.getParticipants().stream()
                    .anyMatch(participant -> participant.getId().equals(userId));
        }

        return false; // Return false if the contest is not found
    }

    public String getupdatedContestStatus(String contestId) {
        Optional<Contest> contestOptional = contestRepository.findById(contestId);
        String response = "";
        if (contestOptional.isPresent()) {
            Contest contest = contestOptional.get();
            LocalDateTime now = LocalDateTime.now();

            if (now.isBefore(contest.getStartTime())) {
                contest.setStatus("Upcoming");
                response = "Upcoming";
            } else if (now.isAfter(contest.getEndTime())) {
                contest.setStatus("Ended");
                response = "Ended";
            } else {
                contest.setStatus("Ongoing");
                response = "Ongoing";
            }

            contestRepository.save(contest);
            return response;
        } else {
            throw new RuntimeException("Contest not found with id: " + contestId);
        }
    }

    public ContestProblem getContestProblem(String contestId, String problemId) {
        // Fetch the contest by its ID
        Contest contest = contestRepository.findById(contestId)
                .orElseThrow(() -> new RuntimeException("Contest not found"));

        // Find the specific problem by its ID
        return contest.getProblemSet().stream()
                .filter(problem -> problem.getId().equals(problemId))
                .findFirst()
                .orElseThrow(() -> new RuntimeException("Problem not found"));
    }

}
