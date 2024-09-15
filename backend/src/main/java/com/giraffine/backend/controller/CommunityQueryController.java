package com.giraffine.backend.controller;

import java.util.List;
import com.giraffine.backend.model.CommunityQuery;
import com.giraffine.backend.model.CommunityQuery.QuerySolution;
import com.giraffine.backend.service.CommunityQueryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "http://localhost:3000")
@RequestMapping("/community-queries")
public class CommunityQueryController {

    @Autowired
    private CommunityQueryService communityQueryService;

    // Add a new community query
    @PostMapping("/add")
    public ResponseEntity<CommunityQuery> addCommunityQuery(@RequestBody CommunityQuery query) {
        CommunityQuery savedQuery = communityQueryService.addCommunityQuery(query);
        return ResponseEntity.ok(savedQuery);
    }

    @GetMapping("/getAllCommunityQueries")
    public ResponseEntity<List<CommunityQuery>> getAllCommunityQueries() {
        return new ResponseEntity<>(communityQueryService.getAllCommunityQuery(), HttpStatus.OK);
    }

    // Add a solution to a community query
    @PostMapping("/{queryId}/addSolution")
    public ResponseEntity<CommunityQuery> addSolution(@PathVariable String queryId, @RequestBody QuerySolution solution) {
        System.out.println(queryId);
        CommunityQuery updatedQuery = communityQueryService.addSolutionToQuery(queryId, solution);
        return ResponseEntity.ok(updatedQuery);
    }

    // Upvote a solution
    @PostMapping("/{queryId}/solutions/{solutionId}/upvote")
    public ResponseEntity<Void> upvoteSolution(@PathVariable String queryId, @PathVariable String solutionId) {
        communityQueryService.upvoteSolution(queryId, solutionId);
        return ResponseEntity.ok().build();
    }

    // Downvote a solution
    @PostMapping("/{queryId}/solutions/{solutionId}/downvote")
    public ResponseEntity<Void> downvoteSolution(@PathVariable String queryId, @PathVariable String solutionId) {
        communityQueryService.downvoteSolution(queryId, solutionId);
        return ResponseEntity.ok().build();
    }
}
