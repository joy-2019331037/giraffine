import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Button, ChakraProvider } from "@chakra-ui/react";
import { AuthContext } from "../context/AuthContext";
import Lottie from "lottie-react";
import "../styles/home.css";
import greetingsPanda from "../assets/data/animationData/greetingsPanda.json";
import loveCode from "../assets/data/animationData/loveCode.json";
import giraffe from "../assets/images/girraffe.png";
import CircularProgress from "@mui/material/CircularProgress";
const levels = [
  "Learner",
  "Explorer",
  "Challenger",
  "Adventurer",
  "Mastermind",
];

const getLevelProgress = (levelProgress) => {
  let currentLevelIndex = -1;
  for (let i = 0; i < levels.length; i++) {
    const level = levels[i];
    if (levelProgress[level].length >= 10) {
      currentLevelIndex = i;
    } else {
      break;
    }
  }
  return currentLevelIndex;
};

const getNextLevelProgress = (levelProgress, currentLevelIndex) => {
  if (currentLevelIndex < levels.length - 1) {
    const nextLevel = levels[currentLevelIndex + 1];
    const solvedProblems = levelProgress[nextLevel].length;
    return solvedProblems;
  }
  return 0;
};

const ProgressBar = ({ progress }) => {
  const divisions = 10; // Number of divisions
  const divisionWidth = 100 / divisions; // Width of each division in percentage

  return (
    <div
      style={{
        height: "1.2rem",
        width: "30rem",
        border: "1px solid #ccc",
        position: "relative",
        background: "#f3f3f3",
        borderRadius: "5px",
      }}
    >
      {/* Background divisions */}
      {Array.from({ length: divisions }).map((_, index) => (
        <div
          key={index}
          style={{
            position: "absolute",
            top: "0",
            left: `${index * divisionWidth}%`,
            width: "1px", // Adjust thickness of the division lines
            height: "100%",
            background: "#bbb", // Color of the division lines
          }}
        />
      ))}

      {/* Filled progress */}
      <div
        style={{
          height: "100%",
          width: `${progress}%`,
          background: "chocolate",
          position: "absolute",
          bottom: "0",
          transition: "width 0.5s ease", // Adjust transition effect if needed
        }}
      />
    </div>
  );
};

const Home = () => {
  const { user } = useContext(AuthContext);
  const [User, setUser] = useState("");
  const [level, setLevel] = useState("");
  const navigate = useNavigate();
  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getUserById/${user._id}`
      );

      setUser(response.data);
      console.log(response.data);
    } catch (error) {
      console.error("Failed to fetch personal submissions : ", error);
    }
  };
  // console.log(User.levelProgress['Explorer'].length);
  useEffect(() => {
    fetchUser();
  }, [user._id]);

  const levelProgress = user.levelProgress; // Assuming this is an object with level names as keys and an array of solved problems as values
  const currentLevelIndex = getLevelProgress(levelProgress);

  const nextLevelProgress = getNextLevelProgress(
    levelProgress,
    currentLevelIndex
  );
  const progressPercentage = (nextLevelProgress / 10) * 100;

  if (!user) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  const handleClick = () => {
    console.log(level);
    navigate(`/problems/${levels[currentLevelIndex + 1]}`);
  };

  return (
    <>
      <div
        style={{
          padding: "1rem 15rem 0rem 15rem",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "3rem",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "2rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginLeft: "auto",
            }}
          >
            <label style={{ fontSize: "2rem", fontWeight: "bold" }}>
              Greetings
            </label>{" "}
            <label
              style={{
                fontSize: "1.8rem",
                color: rankColors[user.rank],
                fontWeight: "bold",
              }}
            >
              {user.firstName} {user.lastName}
            </label>
          </div>
          <Lottie style={{ width: "30%" }} animationData={greetingsPanda} />
        </div>
        <div
          style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}
        >
          <p style={{ fontSize: "1.5rem" }}>
            {" "}
            Your current progress in the{" "}
            <span style={{ color: rankColors[user.rank], fontWeight: "bold" }}>
              {" "}
              {levels[currentLevelIndex + 1]}{" "}
            </span>
            level
          </p>
          <p
            style={{
              fontSize: "1.5rem",
              fontWeight: "bold",
            }}
          >
            {" "}
            {user.levelProgress[levels[currentLevelIndex + 1]].length}/10
          </p>

          <ProgressBar progress={progressPercentage} />
          <ChakraProvider>
            <Button
              onClick={handleClick}
              colorScheme="green"
              width="10%"
              marginTop="1rem"
            >
              Continue
            </Button>
          </ChakraProvider>
        </div>
        {/* <div
          style={{
            display: "flex",
            flexDirection: "column",
            
            marginLeft: "auto",
          }}
        >
          <p style={{ fontSize: "1.5rem" }}>
            {" "}
            Don't miss out on{" "}
            <span style={{ color: "chocolate", fontWeight: "bold" }}>
              {" "}
              important{" "}
            </span>
            contests!!
          </p>
          <p
            style={{
              fontSize: "1.2rem",
            }}
          >
            {" "}
            check out from{" "} 
            
            <label
              onClick={() => navigate("/contests")}
              
              
            style={{color:"blue", cursor:"pointer"}}
            >
              
              here
            </label>
          </p>
        </div> */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "5rem",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              fontSize: "1.5rem",
              fontFamily: "fantasy",
              gap: "0.5rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <label style={{ color: "#5983ff" }}>Learn</label>
            <img style={{ width: "5%", objectFit: "contain" }} src={giraffe} />
            <label style={{ color: "chocolate" }}>Code</label>
            <img style={{ width: "5%", objectFit: "contain" }} src={giraffe} />
            <label style={{ color: "green" }}>Explore</label>
          </div>
          <Lottie style={{ width: "20%" }} animationData={loveCode} />
        </div>
      </div>
    </>
  );
};

export default Home;
