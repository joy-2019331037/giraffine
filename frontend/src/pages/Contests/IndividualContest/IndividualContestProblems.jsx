import React from "react";
import { useNavigate } from "react-router-dom";
import { Box, Heading, Text, List, ListItem, Divider } from "@chakra-ui/react";

const IndividualContestProblems = ({ contest }) => {
  const navigate = useNavigate();
  return (
    <Box p="1rem 5rem 2rem 5rem">
      {contest.problemSet.map((problem, index) => (
        <Box
          key={problem.id}
          p="5px 20px 5px 20px"
          borderWidth="1px"
          borderRadius="lg"
          mb={4}
          backgroundColor="rgb(255, 238, 214)"
        >
          <Text fontSize="1.2rem" mb={2} cursor="pointer" onClick={() => {
            navigate(`/contests/${contest.id}/${problem.id}`)
          }}>
            {problem.id} : {problem.title}
          </Text>
        </Box>
      ))}
    </Box>
  );
};

export default IndividualContestProblems;