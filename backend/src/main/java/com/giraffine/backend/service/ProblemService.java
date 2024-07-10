package com.giraffine.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

import com.giraffine.backend.dao.ProblemRepository;
import com.giraffine.backend.model.Problem;

@Service
public class ProblemService {

    @Autowired
    private ProblemRepository problemRepository;

    public List<Problem> getAllProblems() {
        return problemRepository.findAll();
    }

    public Optional<Problem> getProblemById(String id) {
        return problemRepository.findById(id);
    }

    public List<Problem> getProblemsByLevel(String level) {
        return problemRepository.findByLevel(level);
    }
    

    public Problem createProblem(Problem problem) {
        return problemRepository.save(problem);
    }

    public Problem updateProblem(String id, Problem problemDetails) {
        Optional<Problem> optionalProblem = problemRepository.findById(id);
        if (optionalProblem.isPresent()) {
            Problem problem = optionalProblem.get();
            problem.setTitle(problemDetails.getTitle());
            problem.setDescription(problemDetails.getDescription());
            problem.setInput(problemDetails.getInput());
            problem.setOutput(problemDetails.getOutput());
            problem.setHint(problemDetails.getHint());
            return problemRepository.save(problem);
        } else {
            throw new RuntimeException("Problem not found");
        }
    }

    public void deleteProblem(String id) {
        problemRepository.deleteById(id);
    }

    
}
