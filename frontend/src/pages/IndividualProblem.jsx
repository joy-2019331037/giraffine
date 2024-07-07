import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";

import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

import theme from "../components/Editor/theme.js";
import Editor from "../components/Editor/Editor.jsx";
import { Excalidraw } from "@excalidraw/excalidraw";

import problemsData from "../assets/data/problemsData/ProblemData.js";
import "./../styles/individualproblem.css";

import Lottie from "lottie-react";
import loading from "../assets/data/animationData/loading.json";
import speaker from "../assets/images/speaker.png";

const IndividualProblem = () => {
  const { ID } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [showSettings, setShowSettings] = useState(false);

  // Function to find the problem by ID
  const findProblemByID = (id) => {
    for (const level in problemsData) {
      const problem = problemsData[level].find((problem) => problem.id === id);
      if (problem) {
        return problem;
      }
    }
    return null;
  };

  const problem = findProblemByID(ID);
  const speaking = () => {};
  // useEffect(() => {
  //   if (problem) {
  //     // Function to fetch the image from the AI model
  //     const fetchImage = async (title) => {
  //       try {
  //         const response = await fetch(
  //           "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
  //           {
  //             headers: {
  //               Authorization: "Bearer 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",
  //               "Content-Type": "application/json",
  //             },
  //             method: "POST",
  //             body: JSON.stringify({ inputs: title }),
  //           }
  //         );
  //         if (!response.ok) {
  //           const errorMessage = await response.text();
  //           throw new Error(
  //             `HTTP error! status: ${response.status}, message: ${errorMessage}`
  //           );
  //         }
  //         const blob = await response.blob();
  //         const imageUrl = URL.createObjectURL(blob);
  //         setImageUrl(imageUrl);
  //         // console.log(imageUrl);
  //       } catch (error) {
  //         console.error("Error fetching the image:", error);
  //       }
  //     };

  //     fetchImage(problem.title);
  //   }
  // }, [problem]);

  if (!problem) {
    return <div>Problem not found.</div>;
  }

  return (
    <div className="individualproblem">
      <div className="probDetails">
        <div className="desc">
          <label>{problem.title}</label>
          <p>Description</p>

          <Text className="text" whiteSpace="pre-line">
            {problem.description}
          </Text>
          {/* <img src={speaker} onClick={speaking}/> */}
        </div>

        <div className="io">
          {/* {imageUrl ? (
      <img src={imageUrl} alt="Generated visual representation" />
    ) : (
      <p>Loading image...</p>
    )} */}
          {/* <img src={imageUrl} alt="Generated visual representation" /> */}
          <div className="input">
            <label>Input</label>
            <p>{problem.input}</p>
          </div>
          <div className="output">
            <label>Output</label>
            <p>{problem.output}</p>
          </div>
        </div>
      </div>
      <ChakraProvider theme={theme}>
        <Editor />
      </ChakraProvider>
      <Box marginTop="20px">
        <Button onClick={() => setShowSettings(!showSettings)}>
          {showSettings ? "Close Settings" : "Open Settings"}
        </Button>
        {showSettings && (
          <Menu>
            <MenuButton
              as={Button}
              rightIcon={<i className="arrow down icon" />}
            >
              Options
            </MenuButton>
            <MenuList>
              <MenuItem onClick={onOpen}>Show Excalidraw</MenuItem>
            </MenuList>
          </Menu>
        )}
      </Box>
      <center>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <ModalContent width="50%" >
            <ModalHeader>Excalidraw</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box height="50vh">
                <Excalidraw />
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button onClick={onClose}>Close</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </center>
    </div>
  );
};

export default IndividualProblem;

// //<div>
// {imageUrl ? (
//   <div className="individualproblem">
//     <div className="probDetails">
//       <div className="desc">
//         <label>{problem.title}</label>
//         <p>Description</p>

//         <Text className="text" whiteSpace="pre-line">
//           {problem.description}
//         </Text>
//         {/* <img src={speaker} onClick={speaking}/> */}
//       </div>

//       <div className="io">
//         {/* {imageUrl ? (
//       <img src={imageUrl} alt="Generated visual representation" />
//     ) : (
//       <p>Loading image...</p>
//     )} */}
//         {/* <img src={imageUrl} alt="Generated visual representation" /> */}
//         <div className="input">
//           <label>Input</label>
//           <p>{problem.input}</p>
//         </div>
//         <div className="output">
//           <label>Output</label>
//           <p>{problem.output}</p>
//         </div>
//       </div>
//     </div>
//     <ChakraProvider theme={theme}>
//       <Editor />
//     </ChakraProvider>
//   </div>
// ) : (
//   <center>
//     <Lottie className="loading" animationData={loading} />
//   </center>
// )}
// </div>
