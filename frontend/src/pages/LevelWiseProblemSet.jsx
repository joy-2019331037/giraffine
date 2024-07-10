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
  const { levelName } = useParams();

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/problems/level/${levelName.toLowerCase()}`
        );
        const problems = response.data;
        
        setProblemsData(problems);
        console.log(problemsData)
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, [levelName]);

  const levels = ["Sprout", "Explorer", "Adventurer", "Challenger", "Mastermind"];
  const images = { Sprout: sprout, Explorer: explorer, Adventurer: adventurer, Challenger: challenger, Mastermind: mastermind };
  const currentIndex = levels.indexOf(levelName.charAt(0).toUpperCase() + levelName.slice(1).toLowerCase());

  return (
    <ChakraProvider>
      <div className="levelWiseProblem">
        <div className="Problem">
          <Text className="text">
            <label>{levelName.charAt(0).toUpperCase() + levelName.slice(1)}</label>
            <img src={images[levelName.charAt(0).toUpperCase() + levelName.slice(1).toLowerCase()]} alt={levelName} />
          </Text>
          <VStack align="start" spacing={3}>
            {problemsData.map((problem, problemIndex) => (
              <Link key={problem.id} to={`/problem/${levelName}/${problem.id}`}>
                <Box className="sing_prob">
                  <div>
                    <label className="title">{problem.title}</label>
                  </div>
                </Box>
              </Link>
            ))}
          </VStack>
        </div>
        <center>
          <div className="arrows">
            {currentIndex > 0 && (
              <Link to={`/problems/${levels[currentIndex - 1].toLowerCase()}`}>
                <img src={leftArrow} alt="Previous level" />
              </Link>
            )}
            {currentIndex < levels.length - 1 && (
              <Link to={`/problems/${levels[currentIndex + 1].toLowerCase()}`}>
                <img src={rightArrow} alt="Next level" />
              </Link>
            )}
          </div>
        </center>
      </div>
    </ChakraProvider>
  );
};

export default LevelWiseProblemSet;
