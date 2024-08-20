import React, { useEffect, useState } from "react";
import sprout from "../../assets/images/levels/sprout.png";
import explorer from "../../assets/images/levels/explorer.png";
import adventurer from "../../assets/images/levels/adventurer.png";
import challenger from "../../assets/images/levels/challenger.png";
import mastermind from "../../assets/images/levels/mastermind.png";
import PieChart from "./PieChart";

const PersonalInfo = ({ user }) => {
  const [solvedCounts, setSolvedCounts] = useState({});
  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };
  useEffect(() => {
    if (user && user.levelProgress) {
      const counts = {};
      for (const level in user.levelProgress) {
        counts[level] = user.levelProgress[level].length;
      }
      setSolvedCounts(counts);
    }
  }, [user]);

  const totalProblems = 10; // Example total problems per level
  // const labels = Object.keys(solvedCounts);
  const labels = [
    "Mastermind",
    "Challenger",
    "Adventurer",
    "Explorer",
    "Learner",
  ];
  const values = labels.map(
    (level) => (solvedCounts[level] / totalProblems) * 100
  );

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
        marginBottom:"5rem"
      }}
    >
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent:"center",
          gap:"2rem"
        }}
      >
        <img
          style={{ width: "40%" }}
          src={images[user.rank]}
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
              color: `${rankColors[user.rank]}`,
            }}
          >
            {user.firstName}
          </label>{" "}
          <label
            style={{
              fontFamily: "Georgia",
              fontWeight: "700",
              fontSize: "1.5rem",
              color: `${rankColors[user.rank]}`,
            }}
          >
            {user.lastName}
          </label>
        </div>
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
              color: `${rankColors[user.rank]}`,
              fontSize: "1.1rem",
              fontFamily: "fantasy",
              padding: "10px",
              backgroundColor: "aliceblue",
              textAlign: "center",
              borderRadius: "5px",
              marginTop: "5px",
            }}
          >
            {user.rank}
          </p>
        </div>
        <div style={{ marginTop: "1rem" }}>
          <label
            style={{
              fontSize: "1.1rem",
              fontWeight: "bold",
            }}
          >
            Performance
          </label>
          <PieChart data={{ labels, values }} />
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
