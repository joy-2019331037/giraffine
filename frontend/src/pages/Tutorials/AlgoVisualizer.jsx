import React from "react";
import {Link} from 'react-router-dom'
import { Box, Heading, Text, Flex, List, ListItem } from "@chakra-ui/react";
import "animate.css";
import "../../styles/algorithmVisualizer.css";
import arrow from "../../assets/images/arrow_down.png";

import {categories} from '../../assets/data/visualizerData/Categories.js';

const AlgoVisualizer = () => {
  return (
    <Box className="visualizer-container">
      <Heading
        as="h1"
        mb={10}
        textAlign="center"
        className="animate__animated animate__fadeInDown"
      >
        Algorithm Visualizer
      </Heading>
      <Flex wrap="wrap" justifyContent="space-between">
        {categories.map((category, index) => (
          <Box
            key={index}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
            width={{ base: "100%", md: "48%" }}
            mb={8}
            className="animate__animated animate__fadeInUp"
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <Heading as="h2" size="md" mb={4} mr={10}>
              {category.name}
            </Heading>
            <List spacing={10}>
              {category.items.map((item, itemIndex) => (
                <>
                <ListItem
                  key={item.id}
                  className="animate__animated animate__fadeInLeft"
                  style={{ animationDelay: `${itemIndex * 0.1}s` }}
                >
                 <Text>
                 <img src={arrow}/>
                 <Link to={`/tutorials/algoVisualizer/${category.label}/${item.id}`}>
                 <label> {item.name}</label>
                 </Link>
                 </Text>
                 
                 
                </ListItem>
                </>
              ))}
            </List>
          </Box>
        ))}
      </Flex>
    </Box>
  );
};

export default AlgoVisualizer;
