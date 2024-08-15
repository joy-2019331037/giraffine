import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
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
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import { AuthContext } from "../context/AuthContext.js";

import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

import theme from "../components/Editor/theme.js";
import { Excalidraw } from "@excalidraw/excalidraw";
import { motion } from "framer-motion";
import {
  exportToSvg,
  exportToBlob,
  exportToCanvas,
} from "@excalidraw/excalidraw";

import "./../styles/individualproblem.css";

import Lottie from "lottie-react";
import loading from "../assets/data/animationData/loading.json";
import alert from "../assets/data/animationData/alert.json";
import bird from "../assets/data/animationData/bird_singing.json";
import speaker from "../assets/images/speaker.png";

import settings from "../assets/images/settings.png";
import close from "../assets/images/close.png";

import CodeEditor from "../components/Editor/CodeEditor.jsx";
import LanguageSelector from "../components/Editor/LanguageSelector.jsx";
import { CODE_SNIPPETS } from "../components/Editor/constants.js";

import { executeCode } from "../components/Editor/api.js";

const IndividualProblem = () => {
  const { ID } = useParams();
  const [imageUrl, setImageUrl] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, dispatch } = useContext(AuthContext);
  const {
    isOpen: isHintOpen,
    onOpen: onHintOpen,
    onClose: onHintClose,
  } = useDisclosure();
  const [showSettings, setShowSettings] = useState(false);
  const [problem, setProblem] = useState(null);
  const [accepted, setAccepted] = useState(false);

  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("c");
  const [input, setInput] = useState("");

  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
  };

  const handleButtonClick = () => {
    console.log(editorRef.current.getValue());
  };

  const runCode = async () => {
    const sourceCode = editorRef.current.getValue();
    if (!sourceCode) return;
    try {
      setIsLoading(true);
      const { run: result } = await executeCode(language, sourceCode, input);
      setOutput(result.output);
      result.stderr ? setIsError(true) : setIsError(false);
    } catch (error) {
      console.log(error);
      toast({
        title: "An error occurred.",
        description: error.message || "Unable to run code",
        status: "error",
        duration: 6000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const fetchProblem = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/problems/${ID}`
        );
        const problem = response.data;

        problem.title = problem.title.trim();
        problem.id = problem.id.trim();
        problem.level = problem.level.trim();
        problem.description = problem.description.trim();
        problem.input = problem.testCases[0].input.trim();
        problem.output = problem.testCases[0].expectedOutput.trim();

        problem.description = problem.description.replace(/\\n/g, "\n");
        problem.output = problem.output.replace(/\\n/g, "\n");

        setProblem(problem);
        console.log(problem);
      } catch (error) {
        console.error("Error fetching problems:", error);
      }
    };

    fetchProblem();
  }, [ID]);

  const submitHandler = async () => {
    const sourceCode = editorRef.current.getValue(); // Get the user's code from the editor

    if (!sourceCode) return;

    let allTestCasesPassed = true; // Assume all test cases will pass initially
    console.log(user._id);
    console.log(problem.id);
    
    try {
      for (const testCase of problem.testCases) {
        const { input, expectedOutput } = testCase;

        // Execute the code with the current test case
        const { run: result } = await executeCode(language, sourceCode, input);

        if (result.output.trim() !== expectedOutput.trim()) {
          console.log("Test case failed!");
          allTestCasesPassed = false; // If one test case fails, set this to false
          break; // Stop the loop if a test case fails
        } else {
          console.log("Test case passed!");
        }
      }

      // If all test cases passed, set accepted to true
      setAccepted(allTestCasesPassed);

      if (allTestCasesPassed) {
        console.log("All test cases passed! Problem accepted.");
      } else {
        console.log("Some test cases failed.");
      }

    
     // Submit the code to the backend
     const response = await fetch('http://localhost:8080/submissions/submit?' + new URLSearchParams({
      userId: user._id,
      problemId: problem.id,
      code: sourceCode,
      language: language,
      verdict: allTestCasesPassed ? 'Accepted' : 'Rejected',
    }), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });

    if (!response.ok) {
      throw new Error('Failed to submit code');
    }

     

      // const submission = await response.json();
      // console.log("Submission successful:", submission);
    } catch (error) {
      console.error("An error occurred:", error.message);
    }
  };

  const showHintHandler = () => {
    onHintOpen();
  };

  // const findProblemByID = (id) => {
  //   for (const level in problemsData) {
  //     const problem = problemsData[level].find((problem) => problem.id === id);
  //     if (problem) {
  //       return problem;
  //     }
  //   }
  //   return null;
  // };

  // const problem = findProblemByID(ID);

  if (!problem) {
    return (
      <center>
        {/* <Lottie className="animation" animationData={loading}/> */}

        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <div className="individualproblem">
      <div className="probDetails">
        <div className="desc">
          <label>{problem.title}</label>
          <div>
            <p>Description</p>
            <Text className="description" whiteSpace="pre-line">
              {problem.description}
            </Text>
          </div>
        </div>
        <div className="others">
          <div className="io">
            <div className="input">
              <label>Input</label>
              <p>{problem.input}</p>
            </div>
            <div className="output">
              <label>Output</label>
              <Text whiteSpace="pre-line">{problem.output}</Text>
            </div>
          </div>
          <Box className="settings" marginTop="20px" position="relative">
            <Button onClick={() => setShowSettings(!showSettings)}>
              {showSettings ? (
                <img src={close} alt="Close settings" />
              ) : (
                <img src={settings} alt="Open settings" />
              )}
            </Button>
            {showSettings && (
              <Box
                position="absolute"
                top="20%"
                left="-60"
                transition="all 0.3s ease-in-out"
              >
                <Menu>
                  <MenuButton
                    style={{ marginBottom: "5px", marginTop: "5px" }}
                    as={Button}
                    rightIcon={<i className="arrow down icon" />}
                    className="menu-button"
                  >
                    Options
                  </MenuButton>

                  <MenuList>
                    <MenuItem
                      className="menu-item"
                      onClick={onOpen}
                      style={{ marginBottom: "5px", marginTop: "5px" }}
                    >
                      Open Whiteboard
                    </MenuItem>
                    <MenuItem className="menu-item" onClick={showHintHandler}>
                      Show Hint
                    </MenuItem>
                  </MenuList>
                </Menu>
              </Box>
            )}
          </Box>
        </div>
      </div>
      <ChakraProvider theme={theme}>
        <CodeEditor
          editorRef={editorRef}
          value={value}
          setValue={setValue}
          language={language}
          setLanguage={setLanguage}
          input={input}
          setInput={setInput}
          onMount={onMount}
          onSelect={onSelect}
          runCode={runCode}
          output={output}
          isLoading={isLoading}
          isError={isError}
        />
        <Button onClick={handleButtonClick} mt={4}>
          Log Editor Content
        </Button>
        <Button onClick={() => console.log(output)} mt={4}>
          Log Output
        </Button>
        <Button onClick={submitHandler} mt={4}>
          Submit
        </Button>

        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <div>
            <Draggable handle=".modal-header">
              {/* <ModalContent width="50%" position="absolute" top="0%" left="25%" transform="translate(-50%, -50%)"> */}
              <ModalContent width="50%">
                <ModalHeader className="whiteboard-modal-header">
                  WhiteBoard
                </ModalHeader>
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
            </Draggable>
          </div>
        </Modal>

        <Modal isOpen={isHintOpen} onClose={onHintClose} size="md">
          <ModalOverlay />
          <ModalContent className="hint-modal-content">
            <ModalHeader className="hint-modal-header">
              <Text ml={2}>Hint</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="hint-modal-body">
              <Text className="hint-text">{problem.hint}</Text>
              <Lottie className="animation" animationData={bird} />
              {/* <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
               
              </motion.div> */}
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default IndividualProblem;

/*
  useEffect(() => {
    if (problem) {
      // Function to fetch the image from the AI model
      const fetchImage = async (title) => {
        try {
          const response = await fetch(
            "https://api-inference.huggingface.co/models/ZB-Tech/Text-to-Image",
            {
              headers: {
                Authorization: "Bearer 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",
                "Content-Type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({ inputs: title }),
            }
          );
          if (!response.ok) {
            const errorMessage = await response.text();
            throw new Error(
              `HTTP error! status: ${response.status}, message: ${errorMessage}`
            );
          }
          const blob = await response.blob();
          const imageUrl = URL.createObjectURL(blob);
          setImageUrl(imageUrl);
          // console.log(imageUrl);
        } catch (error) {
          console.error("Error fetching the image:", error);
        }
      };

      fetchImage(problem.title);
    }
  }, [problem]);
*/
