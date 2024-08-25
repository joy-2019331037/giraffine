import React, { useEffect, useState, useContext } from "react";
import { useNavigate  } from "react-router-dom";
import CircularProgress from "@mui/material/CircularProgress";
import axios from "axios";

import { AuthContext } from "../../context/AuthContext";

import sprout from "../../assets/images/levels/sprout.png";
import explorer from "../../assets/images/levels/explorer.png";
import adventurer from "../../assets/images/levels/adventurer.png";
import challenger from "../../assets/images/levels/challenger.png";
import mastermind from "../../assets/images/levels/mastermind.png";

const Leaderboard = () => {
  const [users, setUsers] = useState([]);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/user/getAllUsers`
        );
        const sortedUsers = response.data.sort((a, b) => b.rating - a.rating);
        setUsers(sortedUsers);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, []);

  if (!users) {
    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CircularProgress />
      </div>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "0rem 1rem 5rem 1rem",
      }}
    >
      <h1 style={{ color: "chocolate", marginBottom: "2rem" }}>
        Giraffine Leaderboard
      </h1>
      {users.length > 0 ? (
        <div
          style={{
            width: "70%",
            maxHeight: "80vh",
            overflowY: "auto",
            display: "flex-start",
            flexDirection: "column",
            background: "#fff",
            borderRadius: "10px",
            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          }}
        >
          <div
            style={{
              width: "95%",
              display: "flex",
              justifyContent: "space-around",
              alignItems: "center",
              borderBottom: "2px solid #eee",
              padding: "1rem",
              background: "#fafafa",
              borderTopLeftRadius: "10px",
              borderTopRightRadius: "10px",
            }}
          >
            <div style={{ flex: 1, textAlign: "center", color: "#919191" }}>
              Standings
            </div>
            <div style={{ flex: 1, textAlign: "center", color: "#919191" }}>
              Name
            </div>
            <div style={{ flex: 1, textAlign: "center", color: "#919191" }}>
              Rank
            </div>
            <div style={{ flex: 1, textAlign: "center", color: "#919191" }}>
              Rating
            </div>
          </div>
          {users.map((u, index) => (
            <div
              key={u._id}
              style={{
                width: "95%",
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
                borderBottom: "1px solid #eee",
                padding: "1rem",
                background: index % 2 === 0 ? "#f9f9f9" : "#fff",
                transition: "background 0.3s",
                cursor: "pointer",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "#e8f0fe")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background =
                  index % 2 === 0 ? "#f9f9f9" : "#fff")
              }
            >
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                {index + 1}
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: rankColors[u.rank],
                  fontWeight: "bold",
                }}
              >
                <label
                  onClick={() => {
                    if (u._id === user._id) navigate("/profile");
                    else navigate(`/users/${u._id}`);
                  }}
                  style={{
                    textDecoration: "none",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.textDecoration = "underline")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.textDecoration = "none")
                  }
                >
                  {u.firstName} {u.lastName}
                </label>
              </div>

              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  color: "#777",
                  display: "flex",
                  flexDirection: "row",
                  justifyContent: "center",
                  gap: "0.5rem",
                }}
              >
                <img style={{ width: "10%" }} src={images[u.rank]} />
                {u.rank}
              </div>
              <div
                style={{
                  flex: 1,
                  textAlign: "center",
                  fontWeight: "bold",
                  color: "#555",
                }}
              >
                {u.rating}
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No users found.</p>
      )}
    </div>
  );
};

export default Leaderboard;
