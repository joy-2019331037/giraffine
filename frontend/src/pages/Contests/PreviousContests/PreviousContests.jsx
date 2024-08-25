import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { format } from "date-fns";

import sprout from "../../../assets/images/levels/sprout.png";
import explorer from "../../../assets/images/levels/explorer.png";
import adventurer from "../../../assets/images/levels/adventurer.png";
import challenger from "../../../assets/images/levels/challenger.png";
import mastermind from "../../../assets/images/levels/mastermind.png";

const PreviousContests = () => {
  const [contests, setContests] = useState([]);
  const navigate = useNavigate();

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  useEffect(() => {
    const fetchContests = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/contests/getAllContestsByStatus/Ended`
        );
        setContests(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contests:", error);
      }
    };

    fetchContests();
  }, []);

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM/dd/yyyy HH:mm");
  };

  if (!contests) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <div className="contests-container">
      <label style={{ fontSize: "3rem", color: "chocolate" }}>
        Previous Contests
      </label>
      {contests.length === 0 && (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            margin: "3rem",
          }}
        >
          <label>New contests will be available soon</label>
        </div>
      )}
      {contests.length !== 0 && (
        <div className="contests-grid">
          {contests.length > 0 &&
            contests.map((contest) => (
              <div
                className="contest-card"
                key={contest.id}
                onClick={() => navigate(`/contests/previousContests/${contest.id}`)}
              >
                <center>
                  <div style={{ backgroundColor: "white" }}>
                    <img
                      style={{ width: "30%", margin: "10px" }}
                      src={`${images[contest.level]}`}
                    />
                  </div>
                </center>
                <div
                  style={{
                    backgroundColor: "rgb(255, 247, 234)",
                    padding: "16px",
                  }}
                >
                  <h2>
                    {contest.level} Round {contest.round}
                  </h2>
                  <p>{contest.description}</p>
                  <p>
                    <strong>Starts : </strong> {formatDate(contest.startTime)}
                  </p>
                  <p>
                    <strong>Ends : </strong> {formatDate(contest.endTime)}
                  </p>
                </div>
              </div>
            ))}
        </div>
      )}
    </div>
  );
};

export default PreviousContests;
