import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
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

const Profile = () => {
  const { user, dispatch } = useContext(AuthContext);
  const [activeTab, setActiveTab] = useState(`${user.firstName}`);

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
              onClick={() => setActiveTab(`${user.firstName}`)}
              color={activeTab === `${user.firstName}` ? "green" : "gray"}
              backgroundColor={
                activeTab === `${user.firstName}` ? "#ececec" : "white"
              }
              fontWeight={activeTab === `${user.firstName}` ? "bold" : ""}
            >
              {user.firstName}
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
          </Flex>

          {activeTab === `${user.firstName}` && <PersonalInfo user={user} />}
          {activeTab === "Submissions" && (
            <PersonalSubmissions userId={user._id} />
          )}
        </Box>
      </ChakraProvider>
    </>
  );
};

export default Profile;
