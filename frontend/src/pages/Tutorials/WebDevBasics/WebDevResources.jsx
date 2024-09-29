import React from "react";
import {
  Box,
  Text,
  VStack,
  Link,
  Heading,
  Grid,
  GridItem,
} from "@chakra-ui/react";

const resources = [
  {
    category: "HTML & CSS Documentation",
    items: [
      {
        title: "MDN Web Docs",
        link: "https://developer.mozilla.org/en-US/docs/Web",
      },
      { title: "W3Schools", link: "https://www.w3schools.com/" },
      { title: "HTML Reference", link: "https://htmlreference.io/" },
      { title: "CSS Tricks", link: "https://css-tricks.com/" },
    ],
  },

  {
    category: "Tutorials & Courses",
    items: [
      { title: "FreeCodeCamp", link: "https://www.freecodecamp.org/" },
      { title: "Codecademy", link: "https://www.codecademy.com/" },
      {
        title: "Udemy Web Development Courses",
        link: "https://www.udemy.com/topic/web-development/",
      },
      {
        title: "Coursera HTML & CSS Courses",
        link: "https://www.coursera.org/courses?query=html%20css",
      },
    ],
  },

  {
    category: "Tools & Utilities",
    items: [
      { title: "Can I Use?", link: "https://caniuse.com/" },
      { title: "ColorZilla", link: "http://www.colorzilla.com/" },
      { title: "Font Awesome", link: "https://fontawesome.com/" },
      { title: "Google Fonts", link: "https://fonts.google.com/" },
      { title: "Flexbox Cheat Sheet", link: "https://flexbox.malven.co/" },
      { title: "Grid Layout Cheat Sheet", link: "https://grid.malven.co/" },
    ],
  },

  {
    category: "Books",
    items: [
      {
        title: "HTML & CSS: Design and Build Websites by Jon Duckett",
        link: "https://www.amazon.com/HTML-CSS-Design-Build-Websites/dp/1118008189",
      },
      {
        title: "CSS: The Definitive Guide by Eric Meyer",
        link: "https://www.oreilly.com/library/view/css-the-definitive/9781449325053/",
      },
      {
        title: "Eloquent JavaScript by Marijn Haverbeke",
        link: "https://eloquentjavascript.net/",
      },
      {
        title:
          "JavaScript & JQuery: Interactive Front-End Web Development by Jon Duckett",
        link: "https://www.amazon.com/JavaScript-JQuery-Interactive-Front-End-Development/dp/1118531647",
      },
    ],
    
  },
];

const Resources = () => {
  return (
    <Box p={25} mb={90}>
      <Heading as="h1" size="xl" mb={15} textAlign="center" color="chocolate" fontSize="2rem">
        Web Development Resources
      </Heading>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={60}>
        {resources.map((section, index) => (
          <GridItem key={index}>
            <Box
              bg="gray.100"
             
              borderRadius="lg"
              overflow="hidden"
              p={10}
            >
              <Text fontSize="larger" fontWeight="bold" mb={10} color="green">
                {section.category}
              </Text>
              <VStack align="start" spacing={2}>
                {section.items.map((resource, idx) => (
                  <Link
                    href={resource.link}
                    isExternal
                    color=""
                    fontSize="small"
                    fontFamily="cursive"
                    key={idx}
                    // _hover={{ textDecoration: 'none', color: 'blue.800' }}
                    textDecoration="none"
                    _hover={{ boxShadow: "lg", transform: "scale(1.01)" }}
                    transition="all 0.3s ease-in-out"
                  >
                    {resource.title}
                  </Link>
                ))}
              </VStack>
            </Box>
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
};

export default Resources;
