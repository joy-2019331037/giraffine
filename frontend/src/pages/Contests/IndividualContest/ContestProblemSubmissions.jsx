import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
  useToast,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import reload from "../../../assets/images/reload.png";
import greenTick from "../../../assets/images/greenTick.png";
import "../../Individual Problem/submissions.css";
import CircularProgress from "@mui/material/CircularProgress";
import { executeCode } from "../../../components/Editor/api.js";

import Lottie from "lottie-react";
import acceptedAnimation from "../../../assets/data/animationData/visu_success.json";
import Swal from "sweetalert2";

import learner from "../../../assets/images/levels/sprout.png";
import explorer from "../../../assets/images/levels/explorer.png";
import adventurer from "../../../assets/images/levels/adventurer.png";
import challenger from "../../../assets/images/levels/challenger.png";
import mastermind from "../../../assets/images/levels/mastermind.png";

const ContestProblemSubmissions = ({
  userId,
  submittedBy,
  contestId,
  problem,
  language,
  sourceCode,
  submitted =false,
  resetSubmissionState,
}) => {
  const [submissions, setSubmissions] = useState([]);
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const [accepted, setAccepted] = useState(false);
  const [showCurrentSubmission, setShowCurrentSubmission] = useState(false);
  const editorRef = useRef(null);

  const images = {
    Learner: learner,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  const [testCaseStatuses, setTestCaseStatuses] = useState([]);

  const [value, setValue] = useState("");
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const toast = useToast();

  const contestSubmitHandler = async () => {
    if (!sourceCode) return;
   

    let allTestCasesPassed = true; // Assume all test cases will pass initially
    let failureMessage = ""; // Initialize an empty failure message
    const updatedTestCaseStatuses = [];

    let failedTestCaseInput = ""; // Variable to store failed test case input
    let failedExpectedOutput = ""; // Variable to store failed expected output
    let failedUserOutput = ""; // Variable to store failed user output

    try {
      setShowCurrentSubmission(true);
      for (let i = 0; i < problem.testCases.length; i++) {
        const { input, expectedOutput } = problem.testCases[i];

        // Update status to "pending"
        updatedTestCaseStatuses[i] = { status: "pending" };
        setTestCaseStatuses([...updatedTestCaseStatuses]);

        // Execute the code with the current test case
        const { run: result } = await executeCode(language, sourceCode, input);

        if (result.output.trim() !== expectedOutput.trim()) {
          // console.log("Test case failed!");
          allTestCasesPassed = false; // If one test case fails, set this to false
          updatedTestCaseStatuses[i] = { status: "failed" };
          setTestCaseStatuses([...updatedTestCaseStatuses]);

          // Set the failure message
          if (failureMessage === "") {
            failureMessage = `Wrong answer at test case ${i + 1}`;
            failedTestCaseInput = input;
            failedExpectedOutput = expectedOutput;
            failedUserOutput = result.output.trim();
          }
        } else {
          // console.log("Test case passed!");
          updatedTestCaseStatuses[i] = { status: "passed" };
          setTestCaseStatuses([...updatedTestCaseStatuses]);
        }
      }

      // If all test cases passed, set accepted to true and keep the message empty
      if (allTestCasesPassed) {
        // console.log("All test cases passed! Problem accepted.");
        failureMessage = ""; // No failure message if all test cases passed
        setAccepted(true);
      } else {
        // console.log("Some test cases failed.");
      }

      const contestSubmitResponse = await axios.post(
        `http://localhost:8080/submissions/submit/contest/${contestId}`,
        {
          userId: userId,
          submittedBy: submittedBy,
          problemId: contestId + " "+ problem.id,
          submittedCode: sourceCode,
          timeAndDate:new Date().toISOString(),
          language: language,
          verdict: allTestCasesPassed ? "Accepted" : "W/A",
          message: failureMessage, // Add the failure message here
          failedTestCaseInput: allTestCasesPassed ? "" : failedTestCaseInput,
          failedTestCaseExpectedOutput: allTestCasesPassed
            ? ""
            : failedExpectedOutput,
          failedTestCaseUserOutput: allTestCasesPassed ? "" : failedUserOutput,
        }
      );

      console.log(
        "Submission for Contest successful",
        contestSubmitResponse.data
      );
    } catch (error) {
      if (error.response && error.response.status === 429) {
        const retryAfter = error.response.headers["retry-after"];
        console.error(
          `Rate limit exceeded. Retry after ${retryAfter} seconds.`
        );
        // Implement logic to wait and retry after `retryAfter` seconds
      } else {
        console.error(
          "An error occurred:",
          error.response ? error.response.data : error.message
        );
      }
    }
  };

  useEffect(() => {
    if (submitted === true) {
      resetSubmissionState();
      contestSubmitHandler();
    }
  }, [submitted]);

  useEffect(() => {
    fetchSubmissions();
  }, [userId, problem.id]);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM/dd/yyyy HH:mm:ss");
  };
  const fetchSubmissions = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/submissions/user/${userId}/problem/${contestId+" "+problem.id}`
      );

      const fetchedSubmissions = response.data;
      setSubmissions(fetchedSubmissions);
    } catch (error) {
      console.error("Error fetching submissions:", error);
    }
  };
  return (
    <div className="submissions">
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "1rem 3rem 1rem 3rem",
          margin: "0rem 1rem 0rem 0rem",
          gap: "3rem",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "0rem 2rem 0rem 0rem",
            }}
          >
            <h2 style={{ fontSize: "1.2rem", color: "green" }}>
              Previous Submissions
            </h2>
            <img
              style={{ width: "3%", height: "1%", cursor: "pointer" }}
              src={reload}
              onClick={fetchSubmissions}
            />
          </div>
          {submissions.length === 0 && (
            <div style={{ textAlign: "center", padding: "1rem" }}>
              No previous submissions
            </div>
          )}
          {submissions.length !== 0 && (
            <table>
              <thead>
                <tr>
                  <th>Submission Id</th>
                  <th>Problem Id</th>
                  <th>Time & Date</th>
                  <th>Language</th>
                  <th>Verdict</th>
                </tr>
              </thead>
              <tbody>
                {submissions
                  .slice()
                  .reverse()
                  .map((submission) => (
                    <tr key={submission.id}>
                      <td>
                        <Button variant="link">{submission.id}</Button>
                      </td>
                      <td>{submission.problemId}</td>
                      <td>{formatDate(submission.timeAndDate)}</td>
                      <td>{submission.language}</td>
                      <td
                        style={{
                          color:
                            submission.verdict === "Accepted" ? "green" : "red",
                        }}
                      >
                        {submission.verdict}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          )}
        </div>
        {showCurrentSubmission && (
          <div className="currentSubmission">
            <p className="title">Current Submission</p>
            <div className="testCases">
              {problem.testCases.map((testCase, index) => (
                <div key={index} className="testCaseStatus">
                  <p>Test Case {index + 1}</p>
                  {testCaseStatuses[index]?.status === "pending" && (
                    <CircularProgress size={24} color="inherit" />
                  )}
                  {testCaseStatuses[index]?.status === "passed" && (
                    <span
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "center",
                        color: "green",
                      }}
                    >
                      <img width="15%" src={greenTick} />
                      Passed
                    </span>
                  )}
                  {testCaseStatuses[index]?.status === "failed" && (
                    <span style={{ color: "red" }}>✘ Failed</span>
                  )}
                  {!testCaseStatuses[index] && <span>...</span>}
                </div>
              ))}
            </div>

            {accepted && (
              <div className="result">
                <p style={{ fontSize: "large", color: "green" }}>
                  Solution Accepted !
                </p>
                {/* <Lottie
                  className="animation"
                  animationData={acceptedAnimation}
                /> */}
              </div>
            )}
          </div>
        )}
      </div>

      {/* {selectedSubmission && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent className="submission-modal-content">
            <ModalHeader className="submission-modal-header">
              Submission Details
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="submission-modal-body">
              <p>
                <strong>Submission ID:</strong> {selectedSubmission.id}
              </p>

              <p>
                <strong>Problem ID:</strong> {selectedSubmission.problemId}
              </p>
              <p>
                <strong>Submitted Code:</strong>{" "}
                <pre className="code">{selectedSubmission.submittedCode}</pre>
              </p>
              <p>
                <strong>Language:</strong> {selectedSubmission.language}
              </p>
              <p>
                <strong>Time & Date:</strong>{" "}
                {formatDate(selectedSubmission.timeAndDate)}
              </p>

              <p>
                <strong>Verdict:</strong>{" "}
                <label
                  style={{
                    color:
                      selectedSubmission.verdict === "Accepted"
                        ? "green"
                        : "red",
                  }}
                >
                  {selectedSubmission.verdict}
                </label>
              </p>
              {selectedSubmission.message !== "" && (
                <div>
                  <p>
                    <strong>Message:</strong>{" "}
                    <label
                      style={{
                        color:
                          selectedSubmission.verdict === "Accepted"
                            ? "green"
                            : "red",
                      }}
                    >
                      <underline>{selectedSubmission.message}</underline>
                    </label>
                  </p>

                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      maxHeight: "10rem",
                      width: "100%",
                      overflowX: "auto",
                      overflowY: "auto",
                      backgroundColor: " #e5e4e4",
                      padding: "0.5rem 3rem 0.5rem 3rem",
                      gap: "0.5rem",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>Input</label>
                      <Text whiteSpace="pre-line">
                        {" "}
                        {selectedSubmission.failedTestCaseInput}
                      </Text>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>Expected Output</label>
                      <Text whiteSpace="pre-line" style={{ color: "green" }}>
                        {" "}
                        {selectedSubmission.failedTestCaseExpectedOutput}
                      </Text>
                    </div>

                    <div
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <label>User's Output</label>
                      <Text whiteSpace="pre-line" style={{ color: "red" }}>
                        {" "}
                        {selectedSubmission.failedTestCaseUserOutput}
                      </Text>
                    </div>
                  </div>
                </div>
              )}
            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )} */}
    </div>
  );
};

export default ContestProblemSubmissions;
