import React, { useState, useContext, useEffect } from "react";
import {
  Button,
  ChakraProvider,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  Box,
  Textarea,
  useDisclosure,
  ChakraBaseProvider,
  Tooltip,
} from "@chakra-ui/react";
import add from "../../assets/images/add.png";
import leftArrow from "../../assets/images/left-arrow.png";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

import Lottie from "lottie-react";
import community from "../../assets/data/animationData/community.json";
import codersTogether from "../../assets/data/animationData/codersTogetherStrong.json";

const CommunityQueries = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [solutionText, setSolutionText] = useState("");
  const [selectedQuery, setSelectedQuery] = useState(null);
  const { user, dispatch } = useContext(AuthContext);
  const [queries, setQueries] = useState([]);

  const fetchQueries = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/community-queries/getAllCommunityQueries"
      );
      console.log(response.data);
      setQueries(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchQueries();
  }, []);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleSolutionSubmit = async () => {
    const newSolution = {
      description: solutionText,
      proposedBy: user,
      dateTime: new Date(),
      upVoteCount: 0,
      downVoteCount: 0,
      // Add other necessary fields like queryId if required
    };

    try {
      console.log(selectedQuery.id);
      const response = await axios.post(
        `http://localhost:8080/community-queries/${selectedQuery.id}/addSolution`, // Adjust the API endpoint accordingly
        newSolution
      );
      console.log("Solution submitted:", response);
      setSolutionText(""); // Clear the input after submission
      fetchQueries(); // Optionally refresh the query details
    } catch (error) {
      console.error("Error submitting solution:", error);
    }
  };

  const handleSubmit = async () => {
    const newQuery = {
      postedBy: user,
      title: title,
      description: description,
      dateTime: new Date(),
      solutions: [],
    };
    try {
      const response = await axios.post(
        "http://localhost:8080/community-queries/add",
        newQuery
      );
      console.log(response);
      setTitle("");
      setDescription("");
      onClose();
      fetchQueries(); // Refresh the query list
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handleQueryClick = (query) => {
    setSelectedQuery(query);
  };

  const handleBackToList = () => {
    setSelectedQuery(null);
  };

  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "1rem",
        }}
      >
        <div
          style={{
            textAlign: "center",
            color: "chocolate",
            fontSize: "2rem",
          }}
        >
          Giraffine Community
        </div>
        <div
          style={{
            padding: "2rem 10rem 2rem 5rem",
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-evenly",
            gap: "5rem",
          }}
        >
          <div
            style={{
              width: "40%",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
              borderRight: "1px solid #ccc",
            }}
          >
            <Lottie style={{ width: "80%" }} animationData={community} />
            <div style={{ fontSize: "1.5rem", fontFamily: "fantasy" }}>
              <label style={{ color: "#5983ff" }}>Programmers</label>{" "}
              <label style={{ color: "chocolate" }}>Together</label>{" "}
              <label style={{ color: "green" }}>Strong!</label>
            </div>
            <Lottie
              style={{ margin: "3rem 0rem 3rem 0rem", width: "50%" }}
              animationData={codersTogether}
            />
          </div>
          <div
            style={{
              width: "60%",
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
            }}
          >
            {selectedQuery ? (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "1rem",
                }}
              >
                <Tooltip label="Back to Queries" fontSize="md" placement="top">
                  <img
                    style={{
                      marginRight: "auto",
                      width: "4%",
                      cursor: "pointer",
                    }}
                    onClick={handleBackToList}
                    src={leftArrow}
                    alt="Back"
                  />
                </Tooltip>
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    backgroundColor: "aliceblue",
                    borderRadius: "5px",
                    padding: "1rem 2rem 1rem 2rem",
                  }}
                >
                  <label style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
                    {selectedQuery.title}
                  </label>

                  <div style={{ marginTop: "1.5rem", fontSize: "1.1rem" }}>
                    <label>{selectedQuery.description}</label>
                  </div>

                  <div
                    style={{
                      marginTop: "0.5rem",
                      display: "flex",
                      justifyContent: "space-between", // ensures space between date and name
                      alignItems: "center",
                      color: "gray",
                      fontSize: "smaller",
                    }}
                  >
                    {/* Format the date */}
                    <label>
                      {selectedQuery.postedBy.firstName}{" "}
                      {selectedQuery.postedBy.lastName}
                    </label>
                    <p style={{ marginLeft: "auto" }}>
                      {formatDate(selectedQuery.dateTime)}
                    </p>{" "}
                  </div>
                </div>
                {selectedQuery.solutions.length === 0 && (
                  <div
                    style={{
                      fontSize: "1.1rem",
                      color: "green",
                      textAlign: "center",
                    }}
                  >
                    No solutions posted yet
                  </div>
                )}
                {selectedQuery.solutions.length !== 0 && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0.5rem",
                      padding:"1rem 2rem 1rem 1rem"
                    }}
                  >
                    <label style={{ fontSize: "1.2rem", color: "green" }}>
                      {" "}
                      Solutions
                    </label>
                    <div style={{borderTop:"1px solid #ccc"}}>
                      {selectedQuery.solutions.map((solution) => (
                        <div style={{display:"flex"}}>{solution.description}</div>
                      ))}
                    </div>
                  </div>
                )}
                <div
                  style={{
                    marginTop: "1rem",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                    backgroundColor: "aliceblue",
                    padding: "1rem 2rem 1rem 2rem",
                    borderRadius: "5px",
                    width: "80%",
                  }}
                >
                  <label
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: "bold",
                      color: "chocolate",
                    }}
                  >
                    Post a Solution
                  </label>
                  <Textarea
                    placeholder="Enter your solution here..."
                    size="md"
                    resize="vertical"
                    value={solutionText}
                    onChange={(e) => setSolutionText(e.target.value)}
                  />
                  <Button
                    colorScheme="green"
                    onClick={handleSolutionSubmit}
                    disabled={!solutionText.trim()}
                  >
                    Post
                  </Button>
                </div>
              </div>
            ) : (
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "2rem",
                    maxHeight: "100vh",
                    overflowY: "scroll",
                    scrollbarWidth: "none" /* For Firefox */,
                    msOverflowStyle:
                      "none" /* For Internet Explorer and Edge */,
                  }}
                  // Hide scrollbar for WebKit browsers
                  onScroll={(e) => (e.target.style.scrollbarWidth = "none")}
                  ref={(element) => {
                    if (element) {
                      element.style.overflow = "auto";
                      element.style.scrollbarWidth = "none";
                      element.style.msOverflowStyle = "none"; // IE and Edge
                      element.style.setProperty("--webkit-scrollbar", "none"); // Chrome, Safari, and Edge
                    }
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <label style={{ fontSize: "1.4rem", color: "green" }}>
                      All Queries
                    </label>
                    <Tooltip label="Post a query" fontSize="md" placement="top">
                      <img
                        style={{
                          width: "4%",
                          objectFit: "contain",
                          cursor: "pointer",
                        }}
                        src={add}
                        alt="Add Community Query"
                        onClick={onOpen}
                      />
                    </Tooltip>
                  </div>
                  {queries.map((query) => (
                    <div
                      key={query.id}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "0.5rem",
                        backgroundColor: "aliceblue",
                        borderRadius: "5px",
                        padding: "0.5rem 2rem 0.5rem 2rem",
                        cursor: "pointer",
                      }}
                      onClick={() => handleQueryClick(query)}
                    >
                      <label style={{ fontSize: "1.2rem", fontWeight: "bold" }}>
                        {query.title}
                      </label>
                      <label>{query.description}</label>
                      <label style={{ marginLeft: "auto", color: "gray" }}>
                        {query.postedBy.firstName} {query.postedBy.lastName}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Post Your Query</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Input
              placeholder="Title (optional)"
              mb={4}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              size="sm"
            />
            <Textarea
              placeholder="Enter your query description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              size="sm"
            />
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Submit
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default CommunityQueries;
