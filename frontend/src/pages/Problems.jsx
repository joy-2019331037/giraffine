// src/pages/Problems.jsx

import React from "react";
import { ChakraProvider, Box, Text, VStack } from "@chakra-ui/react";
import theme from "../components/Editor/theme.js";
import problemsData from "../assets/data/problemsData/ProblemData.js";

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
  const images = [sprout, explorer, adventurer, challenger, mastermind];
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
          <>
            <div
              key={level}
              className={`level ${levelIndex % 2 === 0 ? "left" : "right"}`}
              mb={6}
            >
              <Text className="text">
                <label>{level}</label>
                <img src={images[levelIndex]} />
              </Text>
              <VStack align="start" spacing={3}>
                {problems.map((problem, problemIndex) => (
                  <Box
                    key={problemIndex}
                    className={`problem problem-${problemIndex + 1}`}
                  >
                    <Text fontSize="xl">{problem.title}</Text>
                    {/* <Text whiteSpace="pre-line">{problem.description}</Text>
                  <Text><strong>Input:</strong> {problem.input}</Text>
                  <Text><strong>Output:</strong> {problem.output}</Text> */}
                  </Box>
                ))}
                <label>. . . more</label>
              </VStack>
            </div>
          </>
        ))}
      </div>
    </ChakraProvider>
  );
};

export default Problems;
