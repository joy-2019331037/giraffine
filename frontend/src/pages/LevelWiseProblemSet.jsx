import React from "react";
import { useParams } from "react-router-dom";
import { ChakraProvider, Box, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

import problemsData from "../assets/data/problemsData/ProblemData.js";

import sprout from "../assets/images/levels/sprout.png";
import explorer from "../assets/images/levels/explorer.png";
import adventurer from "../assets/images/levels/adventurer.png";
import challenger from "../assets/images/levels/challenger.png";
import mastermind from "../assets/images/levels/mastermind.png";
import leftArrow from "../assets/images/left-arrow.png";
import rightArrow from "../assets/images/right-arrow.png";

import "./../styles/levelWiseProblemSet.css";

const LevelWiseProblemSet = () => {
  const { levelName } = useParams();
  const levels = {
    0: "Sprout",
    1: "Explorer",
    2: "Adventurer",
    3: "Challenger",
    4: "Mastermind",
  };
  const indices = {
    Sprout: 0,
    Explorer: 1,
    Adventurer: 2,
    Challenger: 3,
    Mastermind: 4,
  };
  const images = {
    Sprout: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };
  const currentIndex = indices[levelName];

  return (
    <ChakraProvider>
      <div className="levelWiseProblem">
        {Object.entries(problemsData).map(([level, problems]) => {
          if (level.toLowerCase() === levelName.toLowerCase()) {
            return (
              <>
                <div className="Problem" key={level}>
                  <Text className="text">
                    <label>{level}</label>
                    <img src={images[level]} alt={level} />
                  </Text>
                  <VStack align="start" spacing={3}>
                    {problems.map((problem, problemIndex) => (
                      <Link to={`/problem/${levelName}/${problem.id}`}>
                        <Box key={problemIndex} className="sing_prob">
                          <div>
                            {/* <label className="id">{problem.id}</label> */}
                            <label className="title">{problem.title}</label>
                          </div>
                        </Box>
                      </Link>
                    ))}
                  </VStack>
                </div>
                <center>
                  {" "}
                  <div className="arrows">
                    {currentIndex !== 0 && (
                      <Link to={`/problems/${levels[currentIndex - 1]}`}>
                        <img src={leftArrow} />
                      </Link>
                    )}
                    {currentIndex !== 4 && (
                      <Link to={`/problems/${levels[currentIndex + 1]}`}>
                        {" "}
                        <img src={rightArrow} />
                      </Link>
                    )}
                  </div>
                </center>
                {/* <Chatbot/> */}
              </>
            );
          }
          return null;
        })}
      </div>
    </ChakraProvider>
  );
};

export default LevelWiseProblemSet;
