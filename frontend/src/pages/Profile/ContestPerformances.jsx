import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import CircularProgress from "@mui/material/CircularProgress";

import reload from "../../assets/images/reload.png";

import { Button } from "@chakra-ui/react";

const ContestPerformances = ({ userId }) => {
  const [contestPerformances, setContestPerformances] = useState([]);
  const navigate = useNavigate();

  const fetchContestPerformances = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/contest-performances/user/${userId}`
      );
      setContestPerformances(response.data);
    } catch (error) {
      console.error("Error fetching contest performances", error);
    }
  };

  useEffect(() => {
    fetchContestPerformances();
  }, [userId]);

  console.log(contestPerformances);

  if (!contestPerformances) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <div
      style={{
        maxHeight: "100vh",
        overflowY: "auto",
        display: "flex-start",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        marginBottom:contestPerformances.length===0?"15rem":"8rem"
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
          All Contests Participated
        </h2>
        <img
          style={{ width: "3%", height: "1%", cursor: "pointer" }}
          src={reload}
          onClick={fetchContestPerformances}
        />
      </div>
      {contestPerformances.length === 0 && (
        <div style={{ textAlign: "center", padding: "1rem" }}>
          No participations made in contests yet.
        </div>
      )}
      {contestPerformances.length !== 0 && (
        <center>
          <table>
            <thead>
              <tr>
                <th>Contest Id</th>
                <th>Contest Name</th>
                <th>Problems Solved</th>
                <th>Previous Rating</th>
                <th>Current Rating</th>
                <th>Rating Increment</th>
              </tr>
            </thead>
            <tbody>
              {contestPerformances
                .slice()
                .reverse()
                .map((cp) => (
                  <tr key={cp.id}>
                    <td>
                      <Button
                        variant="link"
                        onClick={() =>navigate(`/contests/previousContests/${cp.contestId}`)}
                      >
                        {cp.contestId}
                      </Button>
                    </td>
                    <td>{cp.contestName}</td>
                    <td>{cp.noOfProblemsSolved}</td>
                    <td>{cp.userPreviousRating}</td>
                    <td>{cp.userCurrentRating}</td>
                    <td
                      style={{
                        color: cp.userRatingIncrement > 0 ? "green" : "red",
                      }}
                    >
                      {cp.userRatingIncrement>0 && <label>+{cp.userRatingIncrement}</label>}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </center>
      )}
    </div>
  );
};

export default ContestPerformances;
