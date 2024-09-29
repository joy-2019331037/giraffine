import React, { useEffect, useState } from "react";
import axios from "axios";
import { format } from "date-fns";
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
import reload from "../../assets/images/reload.png";
const PersonalSubmissions = ({ userId }) => {
  const [personalSubmissions, setPersonalSubmissions] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedSubmission, setSelectedSubmission] = useState(null);

  const openModal = (submission) => {
    setSelectedSubmission(submission);
    onOpen();
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM/dd/yyyy HH:mm:ss");
  };

  const fetchAllSubmissionsByUserId = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/submissions/getAllSubmissionsByUserId/${userId}`
      );
      console.log(response.data);
      setPersonalSubmissions(response.data);
    } catch (error) {
      console.error("Failed to fetch personal submissions : ", error);
    }
  };

  useEffect(() => {
    fetchAllSubmissionsByUserId();
  }, [userId]);

  return (
    <>
      <div
        style={{
          maxHeight: "100vh",
          overflowY: "auto",
          display: "flex-start",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom:personalSubmissions.length===0?"15rem":"8rem"
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0rem 3rem 1rem 3rem",
          }}
        >
          <h2 style={{ fontSize: "1.2rem", color: "green" }}>
            Previous Submissions
          </h2>
          <img
            style={{ width: "3%", height: "1%", cursor: "pointer" }}
            src={reload}
            onClick={fetchAllSubmissionsByUserId}
          />
        </div>
        {personalSubmissions.length === 0 && (
          <div style={{ textAlign: "center", padding: "1rem" }}>
            No submissions made yet.
          </div>
        )}
        {personalSubmissions.length !== 0 && (
          <center>
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
                {personalSubmissions
                  .slice()
                  .reverse()
                  .map((submission) => (
                    <tr key={submission.id}>
                      <td>
                        <Button
                          variant="link"
                          onClick={() => openModal(submission)}
                        >
                          {submission.id}
                        </Button>
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
          </center>
        )}
        {selectedSubmission && (
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
        )}
      </div>
    </>
  );
};

export default PersonalSubmissions;
