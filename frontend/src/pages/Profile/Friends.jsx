import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Lottie from "lottie-react";

import chat from '../../assets/data/animationData/chat.json';
import ChatModal from "../../components/NotificationUpdates/ChatModal";

import sprout from "../../assets/images/levels/sprout.png";
import explorer from "../../assets/images/levels/explorer.png";
import adventurer from "../../assets/images/levels/adventurer.png";
import challenger from "../../assets/images/levels/challenger.png";
import mastermind from "../../assets/images/levels/mastermind.png";
import { Button } from "@chakra-ui/react";

const Friends = ({ userId }) => {
  const navigate = useNavigate();
  const [friends, setFriends] = useState([]);
  const [selectedFriend, setSelectedFriend] = useState(null);
  const [showModal, setShowModal] = useState(false); 
  console.log(userId)

  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/friends/all-friends/${userId}`
        );
        setFriends(response.data);
        setSelectedFriend(response.data[0]);
        console.log(response.data);
        console.log(userId)
      } catch (error) {
        console.error("Error fetching friends:", error);
      }
    };
    fetchFriends();
  }, [userId]);

  const images = {
    Learner: sprout,
    Explorer: explorer,
    Adventurer: adventurer,
    Challenger: challenger,
    Mastermind: mastermind,
  };

  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };

  return (
    <div style={{ display: "flex", gap: "3rem", marginBottom:friends.length===0?"18rem":"0rem" }}>
      {/* Left Side: List of Friends */}

      <div
        style={{
          width: "30%",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          maxHeight: "50vh",
          overflowY: "auto",
        }}
      >
        <label
          style={{
            color: "green",
      
            textAlign: "center",
            fontSize: "1.1rem",
          }}
        >
          Your Friends
        </label>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            gap: "5px",
          }}
        >
          {friends.length===0 && 
          <div style={{fontSize:"1rem", textAlign:"center", color:"chocolate"}}>
            No Friends yet.
          </div>
          }
          {friends.map((friend) => (
            <div
              key={friend.id}
              onClick={() => setSelectedFriend(friend)}
              style={{
                padding: "5px",
                cursor: "pointer",
                border: "1px solid #ccc",
                backgroundColor:
                  selectedFriend && selectedFriend.id === friend.id
                    ? "aliceblue"
                    : "transparent",
                borderRadius: "5px",

                display: "flex",
                justifyContent: "center",
                gap: "5px",
              }}
            >
              <span
                style={{
                  color: `${rankColors[friend.rank]}`,
                  fontSize: "15px",
                  fontWeight: "500",
                }}
              >
                {friend.firstName}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side: Details of the Selected Friend */}
      <div
        style={{
          width: "100%",
          display: "flex",
          flexDirection: "column",
          padding: "20px",
        }}
      >
        {selectedFriend && (
          <div
            style={{ display: "flex", flexDirection: "column", gap: "2rem" }}
          >
            <div
              style={{
                width: "100%",
                display: "flex",
                flexDirection: "row",
                gap: "3rem",
              }}
            >
              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "row",
                  gap: "2rem",
                }}
              >
                <img
                  src={images[selectedFriend.rank]}
                  alt={selectedFriend.rank}
                  style={{
                    width: "80px",
                    height: "80px",
                  }}
                />
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1rem",
                  }}
                >
                  <label
                  onClick={()=>{
                    navigate(`/users/${selectedFriend.id}`)
                  }}
                    style={{
                      fontSize: "1.2rem",
                      color: `${rankColors[selectedFriend.rank]}`,
                      fontWeight: "bold",
                    }}
                  >
                    {selectedFriend.firstName} {selectedFriend.lastName}
                  </label>
                  <label style={{ color: "#a3a2a2" }}>
                    {selectedFriend.rank}
                  </label>
                </div>
              </div>

              <div
                style={{
                  width: "50%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  gap: "1rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      paddingLeft: "10px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Rating:
                  </label>
                  {selectedFriend.rating}
                </div>

                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    gap: "0.5rem",
                  }}
                >
                  <label
                    style={{
                      paddingLeft: "10px",
                      fontWeight: "bold",
                      fontSize: "1rem",
                    }}
                  >
                    Friends With:{" "}
                  </label>
                  {selectedFriend.friends.length}
                </div>
              </div>

              <ChatModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                senderId={selectedFriend.id}
                senderName={selectedFriend.firstName}
              />
            </div>
            <div style={{ fontWeight: "bold" }}>
              Active Status:{" "}
              <label
                style={{
                  color:
                    selectedFriend.activeStatus == "online" ? "green" : "gray",
                  fontWeight: "500",
                }}
              >
                {selectedFriend.activeStatus}
              </label>
            </div>
            <div style={{
              display:"flex",
              flexDirection:"column",
            }}>
               <Lottie style={{width:"15%"}} animationData={chat}></Lottie>
               <Button style={{width:"20%"}}
              onClick={() => {
                setShowModal(true);
              }}
            >
              Open Chat
            </Button>
           
           
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Friends;
