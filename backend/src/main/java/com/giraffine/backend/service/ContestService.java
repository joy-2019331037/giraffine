package com.giraffine.backend.service;

import com.giraffine.backend.model.Contest;
import com.giraffine.backend.model.ContestPerformance;
import com.giraffine.backend.dao.ContestPerformanceRepository;
import com.giraffine.backend.dao.ContestRepository;
import com.giraffine.backend.dao.UserDao;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.giraffine.backend.model.User;
import com.giraffine.backend.model.ContestProblem;
import com.giraffine.backend.model.Submission;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.time.LocalDateTime;

import java.util.List;
import java.util.Map;
import java.time.Duration;
import java.util.Optional;

import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.messaging.simp.SimpMessagingTemplate;

@Service
public class ContestService {

    @Autowired
    private ContestRepository contestRepository;

    @Autowired
    private UserDao ud;

    @Autowired
    private ContestPerformanceRepository cpr;

    private final SimpMessagingTemplate messagingTemplate;

    public ContestService(SimpMessagingTemplate messagingTemplate) {
        this.messagingTemplate = messagingTemplate;
    }

    // Create a new contest
    public Contest createContest(Contest contest) {
        return contestRepository.save(contest);
    }

    // Fetch all contests
    public List<Contest> getAllContests() {
        return contestRepository.findAll();
    }

    public List<Contest> getAllContestsByStatus(String status) {
        return contestRepository.findContestsByStatus(status);
    }

    public List<Contest> getContestsByStatusNotEnded() {
        return contestRepository.findByStatusNot("Ended");
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

    // ------------------------------------------------------------------------------//
    private static final Logger logger = LoggerFactory.getLogger(ContestService.class);

    // @Scheduled(cron = "*/5 * * * * *") // Every 5 seconds //"*/5 * * * * *"
    // Scheduled to run every minute (you can adjust the cron expression) //"0 * * *
    // * *"
    @Scheduled(cron = "*/30 * * * * *")
    public void checkAndUpdateRatings() {

        List<Contest> endedContests = contestRepository.findContestsByStatus("Ended");

        for (Contest contest : endedContests) {
            if (!contest.isRatingsUpdated()) {
                updateRatingsAfterContest(contest);
                contest.setRatingsUpdated(true);
                contestRepository.save(contest); // Save the updated contest with the flag

                // Notify frontend that ratings have been updated
                messagingTemplate.convertAndSend("/topic/ratingUpdates",
                        "Ratings updated for contest: " + contest.getId());
            }
        }
        logger.info("{} - {} Contest ratings updated", LocalDateTime.now(), endedContests.size());
    }

    public void updateRatingsAfterContest(Contest contest) {

        // Check if the contest has ended
        if (contest.getEndTime().isBefore(LocalDateTime.now())) {
            List<User> participants = contest.getParticipants();

            for (User user : participants) {
                List<Submission> userSubmissions = contest.getSubmissions().stream()
                        .filter(submission -> submission.getUserId().equals(user.getId()))
                        .toList();

                updateUserRating(user, contest, userSubmissions);
            }
        }
    }

    private void updateUserRating(User user, Contest contest, List<Submission> submissions) {
        int ratingIncrement = 0;
        int penalty = 0;
        int noOfProblemsSolved = 0;
        for (Submission submission : submissions) {
            if (submission.getVerdict().equals("Accepted")) {
                noOfProblemsSolved += 1;
                String problemRank = getProblemRank(submission.getProblemId());

                int rankDifference = getRankDifference(user.getRank(), problemRank);
                long timeTaken = Duration.between(submission.getTimeAndDate(), contest.getStartTime()).toMinutes();

                double timeFactor = getTimeFactor(timeTaken);

                ratingIncrement += calculateRatingIncrement(rankDifference, timeFactor);
                // System.out.println("rating Increment " + ratingIncrement);
            } else {
                penalty += getPenaltyForWrongSubmission();
            }
        }

        // Apply penalty
        ratingIncrement -= penalty * 3;

        // Create a new ContestPerformance instance
        ContestPerformance cp = new ContestPerformance();

        // set the contest performance
        cp.setContestId(contest.getId());
        cp.setContestName(contest.getLevel() + " Round " + contest.getRound());
        cp.setUserId(user.getId());
        cp.setUserName(user.getFirstName());
        cp.setUserPreviousRating(user.getRating());
        cp.setUserCurrentRating(user.getRating() + ratingIncrement);
        cp.setUserRatingIncrement(ratingIncrement);
        cp.setNoOfProblemsSolved(noOfProblemsSolved);

        // save the contest performance
        cpr.save(cp);

        // Update the user's rating
        user.setRating(user.getRating() + ratingIncrement);
        user.setRatingIncrement(ratingIncrement);

        // Save the updated user
        ud.save(user);

        // Upgrade rank if necessary
        checkAndUpgradeRank(user);
    }

    private String getProblemRank(String problemId) {
        // Extract the letter after the space in the problemId
        String rankLetter = problemId.split(" ")[1];

        // Map the letter to the corresponding rank
        switch (rankLetter) {
            case "A":
                return "Learner";
            case "B":
                return "Explorer";
            case "C":
                return "Adventurer";
            case "D":
                return "Challenger";
            case "E":
                return "Mastermind";
            default:
                throw new IllegalArgumentException("Unknown problem rank: " + rankLetter);
        }
    }

    private int getRankDifference(String userRank, String problemRank) {
        Map<String, Integer> rankMap = Map.of(
                "Learner", 1,
                "Explorer", 2,
                "Adventurer", 3,
                "Challenger", 4,
                "Mastermind", 5);

        int rankDifference = rankMap.get(problemRank) - rankMap.get(userRank);

        // Ensure no negative impact for solving lower-ranked problems
        // if (rankDifference < 0) {
        // rankDifference = 0;
        // }

        // System.out.println("Rank Difference " + rankDifference);
        return rankDifference;
    }

    private double getTimeFactor(long timeTaken) {
        double timeFactor = 3600.0 / timeTaken;

        // System.out.println("Time Factor for " + timeTaken + " seconds: " +
        // timeFactor);
        return timeFactor;
    }

    private double calculateRatingIncrement(int rankDifference, double timeFactor) {
        double basePoints = 1.0;
        // System.out.println(basePoints +rankDifference*2.0);
        return (basePoints + rankDifference * 2.0) * timeFactor;
    }

    private int getPenaltyForWrongSubmission() {
        return 2; // Penalty points for each wrong submission
    }

    private void checkAndUpgradeRank(User user) {
        double rating = user.getRating();
        if (rating >= 130 && user.getRank().equals("Learner")) {
            user.setRank("Explorer");
        } else if (rating >= 210 && user.getRank().equals("Explorer")) {
            user.setRank("Adventurer");
        } else if (rating >= 290 && user.getRank().equals("Adventurer")) {
            user.setRank("Challenger");
        } else if (rating >= 370 && user.getRank().equals("Challenger")) {
            user.setRank("Mastermind");
        }

        // Save the user's updated rank
        ud.save(user);
    }

}
