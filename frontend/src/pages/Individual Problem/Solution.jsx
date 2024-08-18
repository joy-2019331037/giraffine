import React, { useState } from "react";
import {
  ChakraProvider,
  Text,
  Box,
  Collapse,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  useDisclosure,
} from "@chakra-ui/react";
import Lottie from "lottie-react";
import bird from "../../assets/data/animationData/bird_singing.json";
import thinking from "../../assets/data/animationData/thinking.json";
import thinking2 from "../../assets/data/animationData/thinking_2.json";
import thinking3 from "../../assets/data/animationData/thinking_3.json";
import "./solution.css";

const Solution = ({ solutionCode, solutionHint }) => {
  const [isOpen, setIsOpen] = useState(false);
  const {
    isOpen: isHintOpen,
    onOpen: onHintOpen,
    onClose: onHintClose,
  } = useDisclosure();

  const toggleSolution = () => {
    setIsOpen(!isOpen);
  };

  return (
    <ChakraProvider>
      <div className="solution">
        <div>
          <p>
            Like our cozy panda, take your time and try solving the problem on
            your own.
          </p>
          <p>
            {" "}
            However if you need a little help waking up your ideas, you can have
            a look at
            <span
              onClick={onHintOpen}
              style={{
                color: "chocolate",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              {" "}
              this{" "}
            </span>{" "}
            hint here.
          </p>
          <center>
            <Lottie className="animation" animationData={thinking3} />
          </center>
          <p>
            Still stuck? No worries! Below is a <span style={{color:"blue", fontWeight:500}}>c++</span> implementation of the
            solution. Click{" "}
            <span
              onClick={toggleSolution}
              style={{
                color: "chocolate",
                fontWeight: "500",
                cursor: "pointer",
              }}
            >
              here.
            </span>
          </p>
          <Collapse in={isOpen} animateOpacity>
            <Box
              p="1rem"
              mt="1rem"
              bg="gray.100"
              rounded="md"
              shadow="md"
              className="solution-box"
              width="100%"
            >
              <pre style={{ whiteSpace: "pre-wrap" }}>{solutionCode}</pre>
            </Box>
          </Collapse>
        </div>

        <Modal isOpen={isHintOpen} onClose={onHintClose} size="md">
          <ModalOverlay />
          <ModalContent className="hint-modal-content">
            <ModalHeader className="hint-modal-header">
              <Text ml={2}>Hint</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="hint-modal-body">
              <Text className="hint-text">{solutionHint}</Text>
              <Lottie className="animation" animationData={bird} />
            </ModalBody>
          </ModalContent>
        </Modal>
      </div>
    </ChakraProvider>
  );
};

export default Solution;
