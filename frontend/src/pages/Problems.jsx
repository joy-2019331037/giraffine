import React, { useState, useEffect } from "react";
import { ChakraProvider, Box, Text, VStack } from "@chakra-ui/react";
import theme from "../components/Editor/theme.js";
import { Link } from "react-router-dom";
import axios from 'axios';

import "./../styles/problems.css";

import sprout from "../assets/images/levels/sprout.png";
import explorer from "../assets/images/levels/explorer.png";
import adventurer from "../assets/images/levels/adventurer.png";
import challenger from "../assets/images/levels/challenger.png";
import mastermind from "../assets/images/levels/mastermind.png";

import Lottie from "lottie-react";
import panda_hi from "../assets/data/animationData/panda_hi.json";
import coding from "../assets/data/animationData/coding.json";
import ScrollDown from "../assets/data/animationData/scrollDown.json";

const Problems = () => {
  const [problemsData, setProblemsData] = useState({});
  const images = [sprout, explorer, adventurer, challenger, mastermind];

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        const response = await axios.get('http://localhost:8080/problems/');
        const problems = response.data;

        const groupedProblems = problems.reduce((acc, problem) => {
          const { level } = problem;
          if (!acc[level]) {
            acc[level] = [];
          }
          acc[level].push(problem);
          return acc;
        }, {});

        setProblemsData(groupedProblems);
        console.log(problemsData)
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblems();
  }, []);

  return (
    <ChakraProvider theme={theme}>
      <div className="problems_intro">
        <p className="title">Welcome back to Problem Solving</p>
        <div className="msg">
          <div className="delighted">
            <Lottie className="animation" animationData={panda_hi} />
            <div>
              <p>We are</p>
              <p>delighted to</p>
              <p>have you</p>
              <p>back</p>
            </div>
          </div>

          <div className="continue">
            <Lottie className="animation" animationData={coding} />
            <div>
              <p>Pick up</p>
              <p>from where</p>
              <p>you left</p>
              <p>and continue</p>
            </div>
          </div>

          <div className="scroll">
            <Lottie className="animation" animationData={ScrollDown} />
            <div>
              <p>Scroll Down</p>
              <p>to get the</p>
              <p>best out</p>
              <p>of you</p>
            </div>
          </div>
        </div>
      </div>
      <div className="problems">
        {Object.entries(problemsData).map(([level, problems], levelIndex) => (
          <div
            key={level}
            className={`level ${levelIndex % 2 === 0 ? "left" : "right"}`}
            mb={6}
          >
            <Text className="text">
              <label>{level}</label>
              <img src={images[levelIndex]} alt={`${level} icon`} />
            </Text>
            <VStack align="start" spacing={3}>
              {problems.slice(0, 5).map((problem, problemIndex) => (
                <Link key={problem.id} to={`/problem/${level}/${problem.id}`}>
                  <Box className={`problem problem-${problemIndex + 1}`}>
                    <Text fontSize="xl">{problem.title}</Text>
                    {/* <Text whiteSpace="pre-line">{problem.description}</Text> */}
                  </Box>
                </Link>
              ))}
              <label>
                . . . <Link to={`/problems/${level}`}>more</Link>
              </label>
            </VStack>
          </div>
        ))}
      </div>
    </ChakraProvider>
  );
};

export default Problems;
