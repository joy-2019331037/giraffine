import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { toast } from "react-toastify";
import "./toastStyle.css";
import ChatModal from "./ChatModal"; // Import the ChatModal component
import { format } from "date-fns";

const NotificationUpdates = ({ userId }) => {
  const navigate = useNavigate();
  const [stompClient, setStompClient] = useState(null);
  const [messages, setMessages] = useState([]); // State to hold received messages
  const [chatMessages, setChatMessages] = useState([]); // State to hold messages for modal
  const [showModal, setShowModal] = useState(false); // State to control modal visibility
  const [senderId, setSenderId] = useState(""); // State to hold current chat user name
  const [senderName, setSenderName] = useState("");
  const [newMessage, setNewMessage] = useState("");
  

  const formatDate = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour clock (AM/PM)
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const truncateMessage = (message, maxLength = 100) => {
    if (message.length <= maxLength) {
      return message;
    }
    return message.substring(0, maxLength) + ". . .";
  };

  useEffect(() => {
    // Connect to the WebSocket endpoint
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClientInstance = Stomp.over(socket);
    setStompClient(stompClientInstance);

    stompClientInstance.connect({}, () => {
      // Subscribe to rating updates
      stompClientInstance.subscribe("/topic/ratingUpdates", (message) => {
        const notification = message.body + "\nVisit your profile for details";
        toast.success(notification, {
          position: "top-right",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          autoClose: false,
          progress: undefined,
          onClick: () => navigate("/profile"),
        });
      });

      // Subscribe to chat messages for the logged-in user
      stompClientInstance.subscribe(`/topic/${userId}`, (message) => {
        receiveMessage(JSON.parse(message.body));
      });
    });

    return () => {
      if (stompClientInstance) {
        stompClientInstance.disconnect();
      }
    };
  }, [userId, navigate]);

  // Function to send a chat message
  const sendMessage = (receiverId, content) => {
    if (stompClient) {
      const chatMessage = {
        senderId: userId,
        receiverId,
        content,
      };
      stompClient.send(
        "/app/chat.sendMessage",
        {},
        JSON.stringify(chatMessage)
      );
    }
  };

  
  const receiveMessage = (chatMessage) => {
    
    setNewMessage(chatMessage);

    const truncatedMessage = truncateMessage(chatMessage.content);
    console.log(showModal);
    
    if (!showModal) {
      toast.info(
        <div className="toast-body">
          <div>{truncatedMessage}</div>
          <div className="toast-footer">
            <label>{formatDate(chatMessage.timestamp)}</label>
            <label style={{ color: "green" }}>{chatMessage.senderName}</label>
          </div>
        </div>,
        {
          position: "top-right",
          hideProgressBar: false,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          autoClose: false,
          icon: false,
          className: "bubble-toast",
          onClick: () => {
            handleChatClick(chatMessage.senderId, chatMessage.senderName);
            toast.dismiss();
          },
        }
      );
    }
  };

  // Function to handle clicking on the toast notification
  const handleChatClick = (senderId, senderName) => {
    setSenderId(senderId);
    setSenderName(senderName);
    setShowModal(true);
    console.log(showModal)
  };

  // Handle closing the ChatModal
  const handleModalClose = () => {
    setShowModal(false);
  };

  return (
    <>
      <ChatModal
        show={showModal}
        handleClose={handleModalClose}
        senderId={senderId}
        senderName={senderName}
      />
    </>
  );
};

export default NotificationUpdates;
