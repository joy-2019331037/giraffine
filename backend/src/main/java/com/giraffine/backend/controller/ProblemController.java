package com.giraffine.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

import com.giraffine.backend.service.ProblemService;
import com.giraffine.backend.model.Problem;

@RestController
@RequestMapping("/problems")
public class ProblemController {

    @Autowired
    private ProblemService problemService;

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/")
    public List<Problem> getAllProblems() {
        return problemService.getAllProblems();
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/{id}")
    public ResponseEntity<Problem> getProblemById(@PathVariable String id) {
        Optional<Problem> problem = problemService.getProblemById(id);
        if (problem.isPresent()) {
            return ResponseEntity.ok(problem.get());
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @CrossOrigin(origins = "http://localhost:3000")
    @GetMapping("/level/{level}")
    public ResponseEntity<List<Problem>> getProblemsByLevel(@PathVariable String level) {
        List<Problem> problems = problemService.getProblemsByLevel(level);
        if (!problems.isEmpty()) {
            return ResponseEntity.ok(problems);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    

    @PostMapping("/create")
    public Problem createProblem(@RequestBody Problem problem) {
        return problemService.createProblem(problem);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Problem> updateProblem(@PathVariable String id, @RequestBody Problem problemDetails) {
        try {
            Problem updatedProblem = problemService.updateProblem(id, problemDetails);
            return ResponseEntity.ok(updatedProblem);
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProblem(@PathVariable String id) {
        problemService.deleteProblem(id);
        return ResponseEntity.noContent().build();
    }
}
