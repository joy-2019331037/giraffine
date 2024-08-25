package com.giraffine.backend.controller;

import com.giraffine.backend.model.ContestPerformance;
import com.giraffine.backend.service.ContestPerformanceService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/contest-performances")
@CrossOrigin(origins = "http://localhost:3000")
public class ContestPerformanceController {

    @Autowired
    private ContestPerformanceService contestPerformanceService;

    @GetMapping("/user/{userId}")
    public List<ContestPerformance> getContestPerformancesByUserId(@PathVariable String userId) {
        return contestPerformanceService.getContestPerformancesByUserId(userId);
    }
}
