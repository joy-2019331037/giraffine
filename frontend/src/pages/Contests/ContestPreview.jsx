import React, { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import CircularProgress from "@mui/material/CircularProgress";

import sprout from "../../assets/images/levels/sprout.png";
import explorer from "../../assets/images/levels/explorer.png";
import adventurer from "../../assets/images/levels/adventurer.png";
import challenger from "../../assets/images/levels/challenger.png";
import mastermind from "../../assets/images/levels/mastermind.png";

import { ChakraProvider, Button } from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext.js";
import Swal from "sweetalert2";

const ContestPreview = () => {
  const [contest, setContest] = useState(null);
  const [User, setUser] = useState(null);
  const [alreadyRegistered, setAlreadyRegistered] = useState(false);
  const [registrationMessage, setRegistrationMessage] = useState("");
  const [currentTime, setCurrentTime] = useState(null);
  const [contestStatus, setContestStatus] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second
    console.log(currentTime);
    // Clean up the interval on component unmount
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array ensures this effect runs only once

  const { contestId } = useParams();

  const { user } = useContext(AuthContext);

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getUserById/${user._id}`
        );

        setUser(response.data);
      } catch (error) {
        console.error("Failed to fetch personal submissions : ", error);
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
    const isUserAlreadyRegistered = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/contests/isUserRegistered/${contestId}/${user._id}`
        );

        const res = response.data;
        if (res) {
          setAlreadyRegistered(true);
        }
      } catch (error) {
        console.error("Failed to fetch personal submissions : ", error);
      }
    };

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
    isUserAlreadyRegistered();
    fetchUser();
    getUpdatedContestStatus();
  }, [user._id, contestId]);

  const registerUser = async (user, contestId) => {
    try {
      console.log(contestId);
      const response = await axios.post(
        `http://localhost:8080/contests/register/${contestId}`,
        User,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      setRegistrationMessage(response.data);
      setAlreadyRegistered(true);
    } catch (error) {
      console.error("Error in setting up the request:", error);
    }
  };

  const registerHandler = () => {
    Swal.fire({
      title: `Are you sure to register for contest ${contest.level} Round ${contest.round}?`,
      showCancelButton: true,
      confirmButtonText: "Confirm",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        if (alreadyRegistered) {
          Swal.fire(`You are already registered for this contest.`, "", "info");
        } else {
          registerUser(User, contestId);

          Swal.fire(
            `Registration completed for contest ${contest.level} Round ${contest.round}`,
            "",
            "success"
          );
        }
      }
    });
  };

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

  const getStatusColor = () => {
    if (contestStatus == "") return "#969595";

    if (contestStatus == "Ongoing") {
      return "green";
    } else {
      return "#969595";
    }
  };

  if (!contest) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "2rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          border: "1px solid #ccc",
          borderRadius: "5px",
          width: "50%",
          gap: "2rem",
          padding: "1rem 1rem 2rem 1rem",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            alignItems: "center",
          }}
        >
          <h2 style={{ fontSize: "1.5rem", fontWeight: "bold" }}>
            {contest.level} {} Round {contest.round}
          </h2>

          <img
            style={{ width: "15%", margin: "10px" }}
            src={`${images[contest.level]}`}
          />
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            gap: "10rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              gap: "0.5rem",
            }}
          >
            <label>
              <strong>Starts : </strong> {formatDate(contest.startTime)}
            </label>

            <label>
              {" "}
              <strong>Status : </strong>{" "}
              <label style={{ color: getStatusColor() }}>{contestStatus}</label>
            </label>
          </div>
          <ChakraProvider>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                gap: "1rem",
              }}
            >
              <Button
                isDisabled={contestStatus == "Ended" ? true : false}
                onClick={registerHandler}
              >
                Register
              </Button>
              <Button
                onClick={() => {
                  navigate(`/contests/${contestId}`);
                }}
                isDisabled={contestStatus == "Ongoing" ? false : true}
              >
                Enter Contest
              </Button>
            </div>
            
          </ChakraProvider>
         
        </div>
        {contestStatus==="Upcoming" && <label style={{color:"chocolate", fontSize:"0.8rem"}}>*contest entry will be available in due time</label>}
      </div>
    </div>
  );
};

export default ContestPreview;
