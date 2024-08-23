import React, {
  useEffect,
  useState,
  useRef,
  useCallback,
  useContext,
} from "react";
import { useParams, useSubmit } from "react-router-dom";
import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Flex,
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

import { AuthContext } from "../../../context/AuthContext.js";

import CodeEditor from "../../../components/Editor/CodeEditor.jsx";
import { CODE_SNIPPETS } from "../../../components/Editor/constants.js";
import { executeCode } from "../../../components/Editor/api.js";

import Statement from "./ContestProblemStatement.jsx";
import Submissions from "./ContestProblemSubmissions.jsx";

import "./../../Individual Problem/individualproblem.css";

const ContestProblem = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [problem, setProblem] = useState(null);
  const [contest, setContest] = useState(null);
  const [srcCode, setSrcCode] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [activeTab, setActiveTab] = useState("statement");

  const editorRef = useRef(null);
  const [value, setValue] = useState("");
  const [language, setLanguage] = useState("c");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const { contestId, problemId } = useParams();

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const onSelect = (lang) => {
    setLanguage(lang);
    setValue(CODE_SNIPPETS[lang]);
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
    const fetchContest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/contests/getContestById/${contestId}`
        );

        setContest(response.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };
    fetchContest();
  }, [contestId]);
  // console.log(contestId, problemId);
  useEffect(() => {
    if (contest) {
      const problem = contest.problemSet.find((p) => p.id === problemId);
      setProblem(problem);
    }
  }, [contest, problemId]);

  const submitHandler = () => {
    const sourceCode = editorRef.current.getValue(); // Get the user's code from the editor
    setSrcCode(sourceCode);
    setSubmitted(true);
    setActiveTab("submissions");
  };

  const resetSubmissionState = () => {
    setSubmitted(false);
  };

  if (!problem) {
    return (
      <center>
        {/* <Lottie className="animation" animationData={loading}/> */}

        <CircularProgress color="inherit" />
        {/* Loading */}
      </center>
    );
  }

  return (
    <>
      <ChakraProvider>
        <Flex display="flex" justifyContent="center" alignItems="center" m={0}>
          <label
            style={{
              width: "100%",
              padding: "0rem 2rem 1rem 1rem",
              fontSize: "2.5rem",
              color: "green",
              textAlign: "center",
            }}
          >
            {contest.level} Round {contest.round}
          </label>
        </Flex>
        <Flex display="flex" flexDirection="column" alignItems="center" m={0}>
          <label
            style={{
              width: "100%",
              padding: "0rem 2rem 0rem 1rem",
              fontSize: "2rem",
              color: "chocolate",
            }}
          >
            {problem.id} : {problem.title}
          </label>
          <div
            style={{
              width: "100%",
              padding: "0rem 2rem 0.5rem 1rem",
              borderBottom: "1px solid #ccc",
              marginBottom:"1rem"
            }}
          >
            <div style={{display:"flex", flexDirection:"row", gap:"1rem"}}>
              {" "}
              <label style={{color:"gray"}}>Time : {problem.timeLimit}sec</label>
              <label style={{color:"gray"}}>Memory : {problem.memoryLimit}MB</label>
             
            </div>
          </div>
        </Flex>
        <Flex
          padding="0.5rem 1rem 0.5rem 1rem"
          gap="3rem"
          display="flex"
          flexDirection="row"
          justifyContent="center"
          width="100%"
        >
          <Box width="50%" mx="auto">
            <Flex justifyContent="space-evenly" mb={4}>
              <Button
                w="100%"
                onClick={() => setActiveTab("statement")}
                colorScheme={activeTab === "statement" ? "green" : "gray"}
              >
                Statement
              </Button>
              <Button
                w="100%"
                onClick={() => setActiveTab("submissions")}
                colorScheme={activeTab === "submissions" ? "green" : "gray"}
              >
                Submissions
              </Button>
            </Flex>

            {activeTab === "statement" && <Statement problem={problem} />}
            {activeTab === "submissions" && (
              <Submissions
                userId={user._id}
                submittedBy={user.firstName}
                contestId={contestId}
                problem={problem}
                language={language}
                sourceCode={srcCode}
                submitted={submitted}
                resetSubmissionState={resetSubmissionState}
              />
            )}
          </Box>
          <ChakraProvider>
            <Flex w="50%" display="flex" flexDirection="column">
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

              <Button
                onClick={submitHandler}
                m={10}
                colorScheme="green"
                _hover={{ bg: "green.400", fontWeight: "600" }}
              >
                Submit
              </Button>
            </Flex>
          </ChakraProvider>
        </Flex>
      </ChakraProvider>
    </>
  );
};

export default ContestProblem;

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
