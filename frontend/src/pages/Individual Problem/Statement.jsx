import React, { useRef, useState } from "react";

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

import { Excalidraw } from "@excalidraw/excalidraw";
import { motion } from "framer-motion";
import {
  exportToSvg,
  exportToBlob,
  exportToCanvas,
} from "@excalidraw/excalidraw";
import Draggable from "react-draggable";
import { ResizableBox } from "react-resizable";
import "react-resizable/css/styles.css";

import copy from "../../assets/images/copy.png";
import hint from "../../assets/images/hint.png";
import whiteboard from "../../assets/images/whiteboard.png";

import Lottie from "lottie-react";
import bird from "../../assets/data/animationData/bird_singing.json";
import thinking2 from "../../assets/data/animationData/thinking_2.json";

import "./statement.css";

const Statement = ({ problem }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const editorRef = useRef(null);

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const copyIconRef = useRef(null);

  const {
    isOpen: isHintOpen,
    onOpen: onHintOpen,
    onClose: onHintClose,
  } = useDisclosure();

  const showHintHandler = () => {
    onHintOpen();
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(problem.input);
    const iconRect = copyIconRef.current.getBoundingClientRect();
    setTooltipPosition({
      top: iconRect.top,
      left: iconRect.left,
    });
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 2000);
  };

  return (
    <div className="individualproblem">
      <Lottie className="animation" animationData={thinking2} />
      <div className="problemDetails">
        <div>
          <p>Description</p>
          <Text className="description" whiteSpace="pre-line">
            {problem.description}
          </Text>
        </div>

        <div className="io">
          <div className="input">
            <label>Input</label>
            <p>
              {problem.input}
              <img
                src={copy}
                alt="Copy Icon"
                onClick={copyToClipboard}
                ref={copyIconRef}
                style={{ cursor: "pointer", marginLeft: "10px" }}
              />
            </p>
            {showTooltip && (
              <div
                className="tooltip"
                style={{
                  width:"12%",
                  textAlign:"center",
                  position: "absolute",
                  top: tooltipPosition.top+310,
                  left: tooltipPosition.left+150,
                  backgroundColor: "#ccc",
                  color: "black",
                  padding: "1px",
                  borderRadius: "5px",
                  zIndex: 1000,
                  transform: "translate(-50%, -100%)",
                }}
              >
                Copied to clipboard!
              </div>
            )}
          </div>
          <div className="output">
            <label>Output</label>
            <Text whiteSpace="pre-line">{problem.output}</Text>
          </div>
        </div>
      </div>

      <div className="tools">
        <p>Tools</p>
        <div className="options">
          <div onClick={onOpen}>
            <img src={whiteboard} />
            <label> Open Whiteboard</label>
          </div>
          <div onClick={showHintHandler}>
            <img src={hint} />
            <label>Show hint</label>
          </div>
        </div>
      </div>

      <div className="community">
        <p>Community</p>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
        <div>hehe</div>
      </div>

      <ChakraProvider>
        <Modal isOpen={isOpen} onClose={onClose} size="xl">
          <ModalOverlay />
          <div>
            <Draggable handle=".modal-header">
              {/* <ModalContent width="50%" position="absolute" top="0%" left="25%" transform="translate(-50%, -50%)"> */}
              <ModalContent width="50%">
                <ModalHeader className="whiteboard-modal-header">
                  WhiteBoard
                </ModalHeader>
                <ModalCloseButton />
                <ModalBody>
                  <Box height="50vh">
                    <Excalidraw />
                  </Box>
                </ModalBody>
                <ModalFooter>
                  <Button onClick={onClose}>Close</Button>
                </ModalFooter>
              </ModalContent>
            </Draggable>
          </div>
        </Modal>

        <Modal isOpen={isHintOpen} onClose={onHintClose} size="md">
          <ModalOverlay />
          <ModalContent className="hint-modal-content">
            <ModalHeader className="hint-modal-header">
              <Text ml={2}>Hint</Text>
            </ModalHeader>
            <ModalCloseButton />
            <ModalBody className="hint-modal-body">
              <Text className="hint-text">{problem.hint}</Text>
              <Lottie className="animation" animationData={bird} />
              {/* <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9 }}
              >
               
              </motion.div> */}
            </ModalBody>
          </ModalContent>
        </Modal>
      </ChakraProvider>
    </div>
  );
};

export default Statement;
