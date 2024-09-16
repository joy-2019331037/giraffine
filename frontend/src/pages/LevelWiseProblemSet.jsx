import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ChakraProvider, Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import axios from "axios";

import sprout from "../assets/images/levels/sprout.png";
import explorer from "../assets/images/levels/explorer.png";
import adventurer from "../assets/images/levels/adventurer.png";
import challenger from "../assets/images/levels/challenger.png";
import mastermind from "../assets/images/levels/mastermind.png";
import leftArrow from "../assets/images/left-arrow.png";
import rightArrow from "../assets/images/right-arrow.png";

import "./../styles/levelWiseProblemSet.css";

const LevelWiseProblemSet = () => {
  const [problemsData, setProblemsData] = useState([]);
  const [solvedProblems, setSolvedProblems] = useState([]);
  const { levelName } = useParams();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        // Fetch the list of problems for the current level
        const response = await axios.get(
          `http://localhost:8080/problems/level/${levelName}`
        );
        const problems = response.data;
        setProblemsData(problems);

        // Fetch the list of solved problems from session storage or API
        const userData = sessionStorage.getItem("user");
        if (userData) {
          const parsedUserData = JSON.parse(userData);
          console.log(parsedUserData);
          const solved = parsedUserData.levelProgress[levelName] || [];
          console.log(solved.length);
          setSolvedProblems(solved);
        }
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [levelName]);

  // Calculate remaining problems
  const totalProblems = 10;
  const noOfSolvedProblems = solvedProblems.length;
  console.log(solvedProblems.length);
  const remainingProblems = totalProblems - noOfSolvedProblems;

  // Determine if the problem is solved
  const isProblemSolved = (problemId) => solvedProblems.includes(problemId);

  const levels = [
    "Learner",
    "Explorer",
    "Adventurer",
    "Challenger",
    "Mastermind",
  ];
  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };
  const currentIndex = levels.indexOf(
    levelName.charAt(0).toUpperCase() + levelName.slice(1).toLowerCase()
  );

  return (
    <div className="levelWiseProblem">
      <div className="Problem">
        <div className="text">
          <label>
            {levelName.charAt(0).toUpperCase() + levelName.slice(1)}
          </label>
          <img
            src={
              images[
                levelName.charAt(0).toUpperCase() +
                  levelName.slice(1).toLowerCase()
              ]
            }
            alt={levelName}
          />
          {remainingProblems == 0 && (
            <p>You have already solved all problems from this level</p>
          )}
          {remainingProblems != 0 && remainingProblems != 10 && (
            <p>
              You have {remainingProblems} problems left to solve in this level
            </p>
          )}
        </div>

        <div className="problemList" align="start" spacing={3}>
          {problemsData.map((problem) => (
            <Link key={problem.id} to={`/problems/${levelName}/${problem.id}`}>
              <Box
                className={`sing_prob ${
                  isProblemSolved(problem.id) ? "solved" : ""
                }`}
                style={{
                  backgroundColor: isProblemSolved(problem.id)
                    ? "#e2fbe2"
                    : "rgb(255, 238, 214)",
                }}
              >
                <div>
                  <label className="title">{problem.title}</label>
                </div>
              </Box>
            </Link>
          ))}
        </div>
      </div>

      
        <div className="arrows">
          {currentIndex > 0 && (
            <Link to={`/problems/${levels[currentIndex - 1]}`}>
              <img src={leftArrow} alt="Previous level" />
            </Link>
          )}
          {currentIndex < levels.length - 1 && (
            <Link to={`/problems/${levels[currentIndex + 1]}`}>
              <img src={rightArrow} alt="Next level" />
            </Link>
          )}
        </div>
      
    </div>
  );
};

export default LevelWiseProblemSet;
