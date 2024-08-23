import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../context/AuthContext.js";
import axios from "axios";

import CircularProgress from "@mui/material/CircularProgress";

import sprout from "../../../assets/images/levels/sprout.png";
import explorer from "../../../assets/images/levels/explorer.png";
import adventurer from "../../../assets/images/levels/adventurer.png";
import challenger from "../../../assets/images/levels/challenger.png";
import mastermind from "../../../assets/images/levels/mastermind.png";

import IndividualContestProblems from "./IndividualContestProblems.jsx";
import IndividualContestSubmissions from "./IndividualContestSubmissions.jsx";

import { ChakraProvider, Box, Button, Flex } from "@chakra-ui/react";

const IndividualContest = () => {
  const { contestId } = useParams();
  const { user } = useContext(AuthContext);
  const [contest, setContest] = useState(null);
  const [activeTab, setActiveTab] = useState("Problems");
  const [contestStatus, setContestStatus] = useState("");

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
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
    const getUpdatedContestStatus = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/contests/getUpdatedContestStatus/${contestId}`
        );
        setContestStatus(response.data);
      } catch (error) {
        console.error("Failed to fetch personal submissions : ", error);
      }
    };

    getUpdatedContestStatus();
    fetchContest();
  }, [user._id, contestId]);

  if (!contest) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "50%",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2 style={{ fontSize: "2rem", fontWeight: "bold" }}>
              {contest.level} {} Round {contest.round}
            </h2>

            <img
              style={{ width: "15%", margin: "10px" }}
              src={`${images[contest.level]}`}
            />
          </div>
          {contestStatus == "Ongoing" && (
            <ChakraProvider>
              <Box width="100%" mx="auto">
                <Flex
                  gap="5px"
                  borderBottom="1px solid gray"
                  mb={4}
                  paddingBottom="0.3rem"
                >
                  <Button
                    w="15%"
                    onClick={() => setActiveTab("Problems")}
                    color={activeTab === "Problems" ? "green" : "gray"}
                    backgroundColor={
                      activeTab === "Problems" ? "#ececec" : "white"
                    }
                    fontWeight={activeTab === "Problems" ? "bold" : ""}
                  >
                    Problems
                  </Button>
                  <Button
                    w="15%"
                    onClick={() => setActiveTab("Submissions")}
                    color={activeTab === "Submissions" ? "green" : "gray"}
                    backgroundColor={
                      activeTab === "Submissions" ? "#ececec" : "white"
                    }
                    fontWeight={activeTab === "Submissions" ? "bold" : ""}
                  >
                    Submissions
                  </Button>
                </Flex>

                {activeTab === "Problems" && (
                  <IndividualContestProblems contest={contest} />
                )}
                {activeTab === "Submissions" && (
                  <IndividualContestSubmissions contest={contest} />
                )}
              </Box>
            </ChakraProvider>
          )}
          {contestStatus && contestStatus!='Ongoing' && (
            <label style={{color:"chocolate", fontSize:"1.2rem", marginBottom:"7.5rem"}}> Contest is {contestStatus}</label>
          )}
        </div>
      </div>
    </>
  );
};

export default IndividualContest;
