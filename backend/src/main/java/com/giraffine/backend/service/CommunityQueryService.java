package com.giraffine.backend.service;

import java.util.List;
import com.giraffine.backend.model.CommunityQuery;
import com.giraffine.backend.model.CommunityQuery.QuerySolution;
import com.giraffine.backend.repository.CommunityQueryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class CommunityQueryService {

    @Autowired
    private CommunityQueryRepository communityQueryRepository;

    // Add a new query
    public CommunityQuery addCommunityQuery(CommunityQuery query) {
        System.out.println(query);
        return communityQueryRepository.save(query);
    }

    public List<CommunityQuery> getAllCommunityQuery() {
        return communityQueryRepository.findAll();
    }

    // Add a solution to a query
    public CommunityQuery addSolutionToQuery(String queryId, QuerySolution solution) {
        System.out.println(solution);
        System.out.println(queryId);
        Optional<CommunityQuery> queryOptional = communityQueryRepository.findById(queryId);
        if (queryOptional.isPresent()) {
            CommunityQuery query = queryOptional.get();
            System.out.println(query);
            query.getSolutions().add(solution);
            System.out.println(query);
            return communityQueryRepository.save(query);
        }
        return null;
    }

    // Upvote a solution
    public void upvoteSolution(String queryId, String solutionId) {
        Optional<CommunityQuery> queryOptional = communityQueryRepository.findById(queryId);
        if (queryOptional.isPresent()) {
            CommunityQuery query = queryOptional.get();
            for (QuerySolution solution : query.getSolutions()) {
                if (solution.getId().equals(solutionId)) {
                    solution.setUpVoteCount(solution.getUpVoteCount() + 1);
                    communityQueryRepository.save(query);
                    break;
                }
            }
        }
    }

    // Downvote a solution
    public void downvoteSolution(String queryId, String solutionId) {
        Optional<CommunityQuery> queryOptional = communityQueryRepository.findById(queryId);
        if (queryOptional.isPresent()) {
            CommunityQuery query = queryOptional.get();
            for (QuerySolution solution : query.getSolutions()) {
                if (solution.getId().equals(solutionId)) {
                    solution.setDownVoteCount(solution.getDownVoteCount() + 1);
                    communityQueryRepository.save(query);
                    break;
                }
            }
        }
    }
}
