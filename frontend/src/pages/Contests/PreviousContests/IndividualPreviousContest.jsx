import React, { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";
import { format } from "date-fns";



import sprout from "../../../assets/images/levels/sprout.png";
import explorer from "../../../assets/images/levels/explorer.png";
import adventurer from "../../../assets/images/levels/adventurer.png";
import challenger from "../../../assets/images/levels/challenger.png";
import mastermind from "../../../assets/images/levels/mastermind.png";

import { AuthContext } from "../../../context/AuthContext";

const IndividualPreviousContest = () => {
  const [contest, setContest] = useState(null);
  const [showDetails, setShowDetails] = useState(false);
  const { contestId } = useParams();
  const navigate = useNavigate();

  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };

  const { user } = useContext(AuthContext);

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  const formatDate = (dateString) => {
    return format(new Date(dateString), "MM/dd/yyyy HH:mm:ss");
  };

  useEffect(() => {
    const fetchContest = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/contests/getContestById/${contestId}`
        );
        setContest(response.data);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching contest:", error);
      }
    };

    fetchContest();
  }, [contestId]);

  if (!contest) {
    return <CircularProgress />;
  }

  const formattedStartTime = format(new Date(contest.startTime), "PPpp");
  const formattedEndTime = format(new Date(contest.endTime), "PPpp");

  return (
    <div
      style={{
        width: "70%",
        margin: "0 auto",
        padding: "20px",
        backgroundColor: "#f5f5f5",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        marginBottom: "7rem",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <img
          src={images[contest.level]}
          alt={`${contest.level} icon`}
          style={{ width: "50px", height: "50px", marginRight: "20px" }}
        />
        <div style={{ display: "flex", flexDirection: "column" }}>
          <h2 style={{ fontSize: "24px", fontWeight: "bold", margin: "0" }}>
            {contest.level} Round {contest.round}
          </h2>
          <p
            style={{ fontSize: "16px", color: "#777" }}
          >{`Status: ${contest.status}`}</p>
        </div>
      </div>
      <div
        style={{
          lineHeight: "1.6",
          fontSize: "18px",
          marginBottom: "20px",
          display: "flex",
          flexDirection: "row",
          gap: "3rem",
          justifyContent: "center",
        }}
      >
        <p>
          <strong>Participants:</strong> {contest.numberOfParticipants}
        </p>
        <p>
          <strong>Problems:</strong> {contest.numberOfProblems}
        </p>
        <p>
          <strong>Ratings Updated:</strong>{" "}
          {contest.ratingsUpdated ? "Yes" : "No"}
        </p>
      </div>
      <div style={{ textAlign: "center", marginTop: "20px" }}>
        <button
          style={{
            backgroundColor: "#007bff",
            color: "#fff",
            padding: "10px 20px",
            borderRadius: "5px",
            border: "none",
            cursor: "pointer",
            fontSize: "16px",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => setShowDetails((prev) => !prev)}
        >
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      </div>
      {showDetails && (
        <>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "2rem",
              marginTop:"5rem"
            }}
          >
            <div
              style={{
                display: "flex",
                flexDirection: "row",
                justifyContentc: "space-around",
                alignItems: "center",
                borderBottom: "1px solid #ccc",
                gap:"2rem"
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  height:"50vh",
                  maxHeight:"50vh",
                  overflowY:"auto",
                 
                  borderRight:"1px solid #ccc"
                }}
              >
                <h3 style={{color:"chocolate"}}>Participants</h3>
                <ul style={{ listStyleType: "none", width: "50%",  }}>
                  {contest.participants.map((participant, index) => (
                    <li
                      key={index}
                      style={{
                        
                        padding: "10px",
                        borderBottom: "1px solid #ddd",
                      }}
                    >
                      <label
                        onClick={() => {
                          if (participant._id === user._id)
                            navigate("/profile");
                          else navigate(`/users/${participant._id}`);
                        }}
                        style={{
                          color: rankColors[participant.rank],
                          cursor: "pointer",
                        }}
                      >
                        {participant.firstName} {participant.lastName}
                      </label>
                    </li>
                  ))}
                </ul>
              </div>

              <div
                style={{
                  width: "50%",
                  height:"50vh",
                  maxHeight:"50vh",
                  overflowY:"auto",
                  display: "flex",
                  flexDirection: "column",
                 
                }}
              >
                <h3 style={{color:"chocolate"}}>Problems</h3>
                <ul style={{ listStyleType: "none", width:"70%" }}>
                  {contest.problemSet.map((problem, index) => (
                    <li
                      key={index}
                      style={{
                        padding: "10px 20px 10px 20px",
                        borderBottom: "1px solid #ddd",
                        backgroundColor:"rgb(255, 238, 214)",
                        marginBottom:"1rem",
                        borderRadius:"5px",
                        cursor:"pointer"
                      }}
                    >
                    {problem.id} - {problem.title} 
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            <div
              style={{
                marginBottom: "20px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  maxHeight: "50vh",
                  overflowY: "auto",
                }}
              >
                <h3 style={{color:"chocolate"}}>Submissions</h3>
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
                            <div variant="link">{submission.id}</div>
                          </td>
                          <td>{submission.problemId}</td>
                          <td>{submission.submittedBy}</td>
                          <td>{formatDate(submission.timeAndDate)}</td>
                          <td>{submission.language}</td>
                          <td
                            style={{
                              color:
                                submission.verdict === "Accepted"
                                  ? "green"
                                  : "red",
                            }}
                          >
                            {submission.verdict}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualPreviousContest;
