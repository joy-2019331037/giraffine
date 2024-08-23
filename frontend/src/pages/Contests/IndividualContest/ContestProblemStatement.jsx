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

import copy from "../../../assets/images/copy.png";
import whiteboard from "../../../assets/images/whiteboard.png";

import Lottie from "lottie-react";
import thinking2 from "../../../assets/data/animationData/thinking_2.json";

import "../../Individual Problem/statement.css";

const ContestProblemStatement = ({ problem }) => {
  const editorRef = useRef(null);
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [showTooltip, setShowTooltip] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ top: 0, left: 0 });
  const copyIconRef = useRef(null);

  const copyToClipboard = () => {
    navigator.clipboard.writeText(problem.testCases[0].input);
    const iconRect = copyIconRef.current.getBoundingClientRect();
    setTooltipPosition({
      top: iconRect.top,
      left: iconRect.left,
    });
    setShowTooltip(true);
    setTimeout(() => setShowTooltip(false), 1000);
  };

  return (
    <div className="individualproblem">
      <Lottie className="animation" animationData={thinking2} />
      <div className="problemDetails">
        <div className="desc">
          <p>Description</p>
          <Text className="description" whiteSpace="pre-line">
            {problem.description}
          </Text>
          {problem.constraints && (
            <div className="constraints">
              <b>Constraints:</b> <label> {problem.constraints}</label>
            </div>
          )}
        </div>

        <div className="io">
          <div className="input">
            <label>Input</label>
            <p>
              <Text whiteSpace="pre-line">{problem.testCases[0].input}</Text>
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
                  width: "12%",
                  textAlign: "center",
                  position: "absolute",
                  top: tooltipPosition.top + 100,
                  left: tooltipPosition.left + 150,
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
            <Text whiteSpace="pre-line">
              {problem.testCases[0].expectedOutput}
            </Text>
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
        </div>
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
      </ChakraProvider>
    </div>
  );
};

export default ContestProblemStatement;
