import React from "react";
import { Link } from "react-router-dom";
import { Box, Heading, Text, Flex, List, ListItem } from "@chakra-ui/react";
import "../../../styles/algorithmVisualizer.css";
import arrow from "../../../assets/images/arrow_down.png";

import { categories } from "../../../assets/data/visualizerData/Categories.js";

const AlgoVisualizer = () => {
  return (
    <Box className="visualizer-container">
      <Heading mb={20} textAlign="center" fontSize="1.7rem" color="chocolate">
        Algorithm Visualizer
      </Heading>
      <Flex wrap="wrap" justifyContent="space-between">
        {categories.map((category, index) => (
          <Box
            key={index}
            p={4}
            borderRadius="lg"
            width={{ base: "100%", md: "48%" }}
            mb={7}
          >
            <Heading as="h2" size="md" mb={4} mr={10} fontSize="1.4rem">
              {category.name}
            </Heading>
            <List spacing={10}>
              {category.items.map((item, itemIndex) => (
                <>
                  <ListItem key={item.id} >
                    
                      -
                      <Link
                        to={`/tutorials/algoVisualizer/${category.label}/${item.id}`}
                      >
                        <label style={{fontSize:"1.1rem"}}> {item.name}</label>
                      </Link>
                    
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
