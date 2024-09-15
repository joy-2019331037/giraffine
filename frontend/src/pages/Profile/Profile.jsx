import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import Lottie from "lottie-react";

import {
  ChakraProvider,
  Box,
  Text,
  Button,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";

import { AuthContext } from "../../context/AuthContext";
import "../../styles/profile.css";
import PersonalSubmissions from "./PersonalSubmissions";
import PersonalInfo from "./PersonalInfo";
import ContestPerformances from "./ContestPerformances";

import CircularProgress from "@mui/material/CircularProgress";
import Friends from "./Friends";
import Settings from "./Settings";

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState("About");
  const [User, setUser] = useState(null);

  const { userId } = useParams();

  let id = null;
  if (!userId) {
    id = user._id;
  } else {
    id = userId;
  }

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getUserById/${id}`
      );

      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch personal submissions : ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [id]);

  if (!User) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <>
      <ChakraProvider>
        <Box width="50%" mx="auto">
          <Flex
            gap="5px"
            borderBottom="1px solid gray"
            mb={4}
            paddingBottom="0.3rem"
          >
            <Button
              w="15%"
              onClick={() => setActiveTab("About")}
              color={activeTab === "About" ? "green" : "gray"}
              backgroundColor={activeTab === "About" ? "#ececec" : "white"}
              fontWeight={activeTab === "About" ? "bold" : ""}
            >
              Profile
            </Button>
            <Button
              w="15%"
              onClick={() => setActiveTab("Submissions")}
              color={activeTab === "Submissions" ? "green" : "gray"}
              backgroundColor={
                activeTab === "Submissions" ? "#ececec" : "white"
              }
              fontWeight={activeTab === "Submissions" ? "bold" : ""}
            >
              Submissions
            </Button>
            <Button
              w="15%"
              onClick={() => setActiveTab("Contests")}
              color={activeTab === "Contests" ? "green" : "gray"}
              backgroundColor={activeTab === "Contests" ? "#ececec" : "white"}
              fontWeight={activeTab === "Contests" ? "bold" : ""}
            >
              Contests
            </Button>
            {!userId && (
              <>
                <Button
                  w="15%"
                  onClick={() => setActiveTab("Friends")}
                  color={activeTab === "Friends" ? "green" : "gray"}
                  backgroundColor={
                    activeTab === "Friends" ? "#ececec" : "white"
                  }
                  fontWeight={activeTab === "Friends" ? "bold" : ""}
                >
                  Friends
                </Button>
                <Button
                  w="15%"
                  onClick={() => setActiveTab("Settings")}
                  color={activeTab === "Settings" ? "green" : "gray"}
                  backgroundColor={
                    activeTab === "Settings" ? "#ececec" : "white"
                  }
                  fontWeight={activeTab === "Settings" ? "bold" : ""}
                >
                  Settings
                </Button>
              </>
            )}
          </Flex>

          {activeTab === "About" && <PersonalInfo User={User} />}
          {activeTab === "Submissions" && (
            <PersonalSubmissions userId={User._id} />
          )}
          {activeTab === "Contests" && (
            <ContestPerformances userId={User._id} />
          )}
          {activeTab == "Friends" && <Friends userId={User._id} />}
          {activeTab == "Settings" && <Settings userId={User._id}/>}
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Profile;
