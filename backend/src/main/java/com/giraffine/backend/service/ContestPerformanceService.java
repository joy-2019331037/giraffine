package com.giraffine.backend.service;

import com.giraffine.backend.model.ContestPerformance;
import com.giraffine.backend.dao.ContestPerformanceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContestPerformanceService {

    @Autowired
    private ContestPerformanceRepository contestPerformanceRepository;

    public List<ContestPerformance> getContestPerformancesByUserId(String userId) {
        return contestPerformanceRepository.findByUserId(userId);
    }
}
