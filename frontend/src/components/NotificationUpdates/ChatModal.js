import React, { useState, useEffect, useContext } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  VStack,
  Text,
  Input,
  HStack,
  Box,
  ChakraProvider,
} from "@chakra-ui/react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import { useToast } from "@chakra-ui/react";

import reload from "../../assets/images/reload.png";

const ChatModal = ({ show, handleClose, senderId, senderName }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [messageContent, setMessageContent] = useState("");
  const { user } = useContext(AuthContext);
  const toast = useToast();
  
  useEffect(() => {
    console.log(show);
    if(show)
    toast.closeAll(); // Close all toasts when ChatModal is opened
  },[]);

  const formatDate = (dateString) => {
    const options = {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true, // Use 12-hour clock (AM/PM)
    };
    return new Date(dateString).toLocaleTimeString(undefined, options);
  };

  const fetchChatHistory = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/chat/conversation/${user._id}/${senderId}`
      );
      setChatHistory(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, [senderId, user._id]);

  const handleSendMessage = async () => {
    if (messageContent.trim() !== "") {
      try {
        const chatMessage = {
          senderId: user._id,
          senderName: user.firstName,
          receiverId: senderId,
          content: messageContent,
          timestamp: new Date().toISOString(),
        };

        // Send the message to the backend
        await axios.post("http://localhost:8080/chat/send", chatMessage);

        // Optionally, you can update the chat history immediately
        setChatHistory((prevHistory) => [...prevHistory, chatMessage]);

        // Clear the message input field
        setMessageContent("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  return (
    <ChakraProvider>
      <Modal isOpen={show} onClose={handleClose} isCentered>
        <ModalOverlay />
        <ModalContent maxH="70vh">
          <ModalHeader
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
            }}
          >
            <label>Chat with {senderName}</label>
            <img
              style={{ width: "5%", height: "fit-content", cursor: "pointer" }}
              src={reload}
              onClick={fetchChatHistory}
            />
          </ModalHeader>

          <ModalBody
            overflowY="scroll"
            css={{
              "&::-webkit-scrollbar": { display: "none" },
              "-ms-overflow-style": "none" /* Internet Explorer 10+ */,
              "scrollbar-width": "none" /* Firefox */,
            }}
          >
            <VStack spacing={2} align="stretch">
              {chatHistory.map((msg, index) => (
                <Box
                  key={index}
                  alignSelf={
                    msg.senderId === user._id ? "flex-end" : "flex-start"
                  }
                  bg={msg.senderId === user._id ? "green.100" : "#FFDEBA"}
                  borderRadius="lg"
                  p={3}
                  maxW="80%"
                >
                  <Text>{msg.content}</Text>
                  <Text fontSize="10px" color="gray.500" textAlign="right">
                    {formatDate(msg.timestamp)}
                  </Text>
                </Box>
              ))}
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack w="100%">
              <Input
                placeholder="Type a message..."
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
              />
              <Button colorScheme="blue" onClick={handleSendMessage}>
                Send
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </ChakraProvider>
  );
};

export default ChatModal;
