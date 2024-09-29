import React, { useEffect, useState, useContext } from "react";
import sprout from "../../assets/images/levels/sprout.png";
import explorer from "../../assets/images/levels/explorer.png";
import adventurer from "../../assets/images/levels/adventurer.png";
import challenger from "../../assets/images/levels/challenger.png";
import mastermind from "../../assets/images/levels/mastermind.png";
import PieChart from "./PieChart";
import { useLocation, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

const PersonalInfo = ({ User, isFriend }) => {
  const { user, dispatch } = useContext(AuthContext);
  const [solvedCounts, setSolvedCounts] = useState({});
  const [noProblemsSolved, setNoProblemsSolved] = useState(false);
  const [friendButtonStatus, setFriendButtonStatus] = useState("Add Friend");
  const { userId } = useParams();

  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };

  useEffect(() => {
    if (User && User.levelProgress) {
      const counts = {};
      for (const level in User.levelProgress) {
        counts[level] = User.levelProgress[level].length;
      }
      setSolvedCounts(counts);
    }
  }, [User]);

  const sendFriendRequest = async () => {
    try {
      const response = await axios.post(
        `http://localhost:8080/friends/send-request/${userId}/${user.id}`
      );
      setFriendButtonStatus("Request Sent");
    } catch (error) {
      console.log(error);
    }
  };

  const requestSentOrNot = async () => {
    try {
      let response;
      if (userId) {
        response = await axios.get(
          `http://localhost:8080/friends/getAllFriendRequests/${userId}`
        );
      }

      const friendRequests = response.data; // Assuming this is an array of User objects
      console.log(friendRequests);

      let matchWith = user.id; // The ID you're checking against

      // Check if any user in friendRequests has an id matching matchWith
      const isMatch = friendRequests.some((friend) => friend.id === matchWith);

      if (isMatch) {
        setFriendButtonStatus("Request Sent");
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    requestSentOrNot();
  }, []);

  const totalProblems = 10; // Example total problems per level
  // const labels = Object.keys(solvedCounts);
  const levels = [
    "Mastermind",
    "Challenger",
    "Adventurer",
    "Explorer",
    "Learner",
  ];
  const values = levels.map(
    (level) => (solvedCounts[level] / totalProblems) * 100
  );

  const checkNoProblemsSolved = () => {
    const allEmpty = levels.every(
      (level) => User.levelProgress[level].length === 0
    );
    setNoProblemsSolved(allEmpty);
  };

  useEffect(() => {
    checkNoProblemsSolved();
  }, []);

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        padding: "0.5rem 2rem 0rem 2rem",
        marginBottom: "5rem",
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "2rem",
        }}
      >
        <img
          style={{ width: "40%" }}
          src={images[User.rank]}
          alt="rank image"
        />
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            gap: "0.5rem",
          }}
        >
          <label
            style={{
              fontFamily: "Georgia",
              fontWeight: "700",
              fontSize: "1.5rem",
              color: `${rankColors[User.rank]}`,
            }}
          >
            {User.firstName}
          </label>{" "}
          <label
            style={{
              fontFamily: "Georgia",
              fontWeight: "700",
              fontSize: "1.5rem",
              color: `${rankColors[User.rank]}`,
            }}
          >
            {User.lastName}
          </label>
        </div>
        {isFriend && (
          <div
            style={{
              width: "50%",
              backgroundColor: "aliceblue",
              textAlign: "center",
              padding: "5px",
              borderRadius: "10px",
              fontSize: "1.1rem",
              fontFamily: "cursive",
            }}
          >
            Friend
          </div>
        )}

        {!isFriend && userId !== user.id && (
          <div
            onClick={sendFriendRequest}
            style={{
              width: "50%",
              backgroundColor: "aliceblue",
              textAlign: "center",
              padding: "5px",
              borderRadius: "10px",
              fontSize: "1.1rem",
              fontFamily: "cursive",
              cursor: "pointer",
            }}
          >
            {friendButtonStatus}
          </div>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <div>
          <label
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Current Rank
          </label>
          <p
            style={{
              color: `${rankColors[User.rank]}`,
              fontSize: "1.1rem",
              fontFamily: "fantasy",
              padding: "10px",
              backgroundColor: "aliceblue",
              textAlign: "center",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            {User.rank}
          </p>
        </div>
        <div>
          <label
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Contest Rating
          </label>
          <p
            style={{
              color: `${rankColors[User.rank]}`,
              fontSize: "1.1rem",
              fontFamily: "fantasy",
              padding: "10px",
              backgroundColor: "aliceblue",
              textAlign: "center",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            {User.rating}
          </p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Problem Solved
          </label>

          {!noProblemsSolved && <PieChart data={{ levels, values }} />}
          {noProblemsSolved && (
            <p
              style={{
                margin: "1rem 0rem 1rem 0rem",
                fontSize: "0.8rem",
                color: "chocolate",
              }}
            >
              No Problems Solved yet
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
