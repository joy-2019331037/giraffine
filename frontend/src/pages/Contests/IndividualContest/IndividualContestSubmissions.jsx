import React from "react";
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
import { format } from "date-fns";

const IndividualContestSubmissions = ({ contest }) => {
  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM/dd/yyyy HH:mm");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: "4rem",
      }}
    >
      <h2 style={{ fontSize: "1.2rem", color: "green" }}>
        All Submissions
      </h2>
      {contest.submissions.length != 0 && (
        <table>
          <thead>
            <tr>
              <th>Submission Id</th>
              <th>Problem Id</th>
              <th>Submitted By</th>
              <th>Time & Date</th>
              <th>Language</th>
              <th>Verdict</th>
            </tr>
          </thead>
          <tbody>
            {contest.submissions
              .slice()
              .reverse()
              .map((submission) => (
                <tr key={submission.id}>
                  <td>
                    <Button variant="link">{submission.id}</Button>
                  </td>
                  <td>{submission.problemId}</td>
                  <td>{submission.submittedBy}</td>
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
      {contest.submissions.length == 0 && (
        <div
          style={{ textAlign: "center", padding: "1rem", color: "chocolate" }}
        >
          This contest has no submissions yet.
        </div>
      )}
    </div>
  );
};

export default IndividualContestSubmissions;
