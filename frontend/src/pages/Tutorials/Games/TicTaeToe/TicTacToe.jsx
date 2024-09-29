import React, { useState, useEffect } from "react";
import { Box, Grid, Button, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import Modal from "./Modal";
import "./tictactoe.css";

import Lottie from "lottie-react";
import success from "../../../../assets/data/animationData/visu_success.json";
import hintIdea from "../../../../assets/images/game/critical-thinking.gif";

const TicTacToe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
  const [hint, setHint] = useState("");
  const [thinking, setThinking] = useState(false);
  const [winnerFound, setWinnerFound] = useState(false);
  const [difficulty, setDifficulty] = useState("easy");
  const [showInstructions, setShowInstructions] = useState(false);

  const calculateWinner = (squares) => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < lines.length; i++) {
      const [a, b, c] = lines[i];
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return squares[a];
      }
    }
    return null;
  };

  const minimax = (newBoard, depth, isMaximizing) => {
    const winner = calculateWinner(newBoard);
    if (winner === "X") return -10 + depth;
    if (winner === "O") return 10 - depth;
    if (newBoard.every((square) => square !== null)) return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      newBoard.forEach((_, i) => {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          const score = minimax(newBoard, depth + 1, false);
          newBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      });
      return bestScore;
    } else {
      let bestScore = Infinity;
      newBoard.forEach((_, i) => {
        if (newBoard[i] === null) {
          newBoard[i] = "X";
          const score = minimax(newBoard, depth + 1, true);
          newBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      });
      return bestScore;
    }
  };

  const computerMove = () => {
    const newBoard = [...board];

    if (difficulty === "easy") {
      // Easy difficulty: random move
      const availableMoves = newBoard
        .map((val, index) => (val === null ? index : null))
        .filter((val) => val !== null);
      const randomMove =
        availableMoves[Math.floor(Math.random() * availableMoves.length)];
      newBoard[randomMove] = "O";
    } else {
      // Hard difficulty: minimax algorithm
      let bestMove;
      let bestScore = -Infinity;

      newBoard.forEach((_, i) => {
        if (newBoard[i] === null) {
          newBoard[i] = "O";
          const score = minimax(newBoard, 0, false);
          newBoard[i] = null;
          if (score > bestScore) {
            bestScore = score;
            bestMove = i;
          }
        }
      });

      if (bestMove !== undefined) {
        newBoard[bestMove] = "O";
      }
    }

    setBoard(newBoard);
    setIsXNext(true);
    setHint(calculateHint(newBoard));
    setThinking(false);
  };

  const calculateHint = (board) => {
    let bestMove;
    let bestScore = Infinity;
    const newBoard = [...board];

    newBoard.forEach((_, i) => {
      if (newBoard[i] === null) {
        newBoard[i] = "X";
        const score = minimax(newBoard, 0, true);
        newBoard[i] = null;
        if (score < bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    });

    return bestMove !== undefined
      ? `Consider placing your next move at position ${bestMove + 1}`
      : "";
  };

  const handleClick = (index) => {
    if (thinking || winnerFound) return;
    const newBoard = [...board];
    if (calculateWinner(board) || board[index]) return;
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsXNext(false);
    setThinking(true);
  };

  useEffect(() => {
    const winner = calculateWinner(board);
    if (winner) {
      setWinnerFound(true);
      setHint(""); // Clear hint when game is over
      setThinking(false);
      return;
    }

    if (board.every((cell) => cell !== null)) {
      setWinnerFound(true);
      setHint(""); // Clear hint if the board is full and no winner
      return;
    }

    if (!isXNext && !winner) {
      setTimeout(() => computerMove(), 3000); // Simulate delay for computer thinking
    }
  }, [isXNext, board]);

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true);
    setHint("");
    setThinking(false);
    setWinnerFound(false);
  };

  const renderSquare = (index) => (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.8 }}
      transition={{ duration: 0.3 }}
      style={{ position: "relative" }} // Ensure the container is positioned relatively
    >
      <Text
        position="absolute"
        top="0"
        left="2"
        m="1"
        fontSize="10px"
        color="gray"
        zIndex="1"
      >
        {index + 1}
      </Text>
      <Button
        h="100px"
        w="100px"
        bg={index % 2 === 0 ? "#fadfac" : "#9ffa98"}
        color="black"
        fontSize="30px"
        onClick={() => handleClick(index)}
        disabled={board[index]}
        style={{ position: "relative", zIndex: "0" }} // Ensure button content is layered above the number
      >
        {board[index]}
      </Button>
    </motion.div>
  );

  const winner = calculateWinner(board);
  const status = winner
    ? winner === "X"
      ? "Congrats! You won!"
      : "You lost!"
    : board.every((cell) => cell !== null) // Check if the board is full
    ? "Match Drawn"
    : thinking
    ? "Computer is thinking..."
    : isXNext
    ? "Your Turn"
    : "Computer's Turn";

  const handleInstructions = () => {
    setShowInstructions(true);
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <Box className="tictactoe" textAlign="center" py={10}>
      <h1 style={{fontSize:'1.5rem'}}>Tic Tac Toe</h1>
      <Box mt={10} mb={40}>
        <Text fontSize="lg" fontWeight="500" mb={2}>
          Select Difficulty
        </Text>
        <label>
          <input
            type="radio"
            name="difficulty"
            value="easy"
            checked={difficulty === "easy"}
            onChange={(e) => {
              setDifficulty(e.target.value);
              resetGame(); // Reset game on difficulty change
            }}
          />
          Easy
        </label>

        <label style={{ marginLeft: "15px" }}>
          <input
            type="radio"
            name="difficulty"
            value="hard"
            checked={difficulty === "hard"}
            onChange={(e) => {
              setDifficulty(e.target.value);
              resetGame(); // Reset game on difficulty change
            }}
          />
          Hard
        </label>
      </Box>
      <Text fontSize="1.2rem" color="chocolate" mb={15}>
        {status}
      </Text>
      <div className="tictactoe-content">
        {winner === "X" && (
          <Lottie className="animation" animationData={success} />
        )}
        <Grid templateColumns="repeat(3, 1fr)" gap={4} mx="auto" w="300px">
          {Array.from({ length: 9 }).map((_, i) => renderSquare(i))}
        </Grid>
        {winner === "X" && (
          <Lottie className="animation" animationData={success} />
        )}
      </div>
      <div className="buttons">
        <button onClick={resetGame}>Reset Game</button>
        <button className="instructions-btn" onClick={handleInstructions}>
          ?
        </button>
      </div>
      {hint && !thinking && !winnerFound && (
        <div style={{ display: "flex", flexDirection: "row", alignItems:"center",justifyContent:"center", gap: "1rem" }}>
          <Text mt={50} fontSize="1.2rem" color="chocolate" mb={15}>
            {hint}
          </Text>
          <img className="hintIdea" src={hintIdea} />
        </div>
      )}
      {showInstructions && <Modal onClose={closeInstructions} />}{" "}
      {/* Show modal */}
    </Box>
  );
};

export default TicTacToe;
