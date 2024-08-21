package com.giraffine.backend.controller;

import com.giraffine.backend.model.Contest;
import com.giraffine.backend.service.ContestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import com.giraffine.backend.model.User;

import java.util.List;

@RestController
@RequestMapping("/contests")
@CrossOrigin(origins = "http://localhost:3000")
public class ContestController {

    @Autowired
    private ContestService contestService;

    // Create a new contest
    @PostMapping("/create")
    public Contest createContest(@RequestBody Contest contest) {
        return contestService.createContest(contest);
    }

    // Get all contests
    @GetMapping("/getAllContests")
    public List<Contest> getAllContests() {
        return contestService.getAllContests();
    }

    // Get contest by ID
    @GetMapping("/getContestById/{id}")
    public Contest getContestById(@PathVariable String id) {
        return contestService.getContestById(id);
    }

    // Register a user to a contest
    @PostMapping("/register/{contestId}")
    public String registerUserToContest(@PathVariable String contestId, @RequestBody User user) {
        return contestService.registerUserToContest(contestId, user);
    }

    @GetMapping("/isUserRegistered/{contestId}/{userId}")
    public boolean isUserRegistered(@PathVariable String contestId, @PathVariable String userId) {
        return contestService.isUserRegistered(contestId, userId);
    }

    @GetMapping("/getUpdatedContestStatus/{contestId}")
    public String getUpdatedContestStatus(@PathVariable String contestId) {
        return contestService.getupdatedContestStatus(contestId);
    }

}
