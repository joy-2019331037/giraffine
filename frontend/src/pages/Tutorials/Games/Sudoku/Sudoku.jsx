import React, { useState, useEffect } from "react";
import "./sudoku.css"; // For styling the board

import Lottie from "lottie-react";
import success from "../../../../assets/data/animationData/visu_success.json";
import Modal from "./Modal";

const isValid = (board, row, col, num) => {
  for (let x = 0; x < 9; x++) {
    if (board[row][x] === num || board[x][col] === num) return false;
  }
  const startRow = row - (row % 3);
  const startCol = col - (col % 3);
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[startRow + i][startCol + j] === num) return false;
    }
  }
  return true;
};

const generateRandomBoard = () => {
  const board = Array(9)
    .fill(null)
    .map(() => Array(9).fill(0));

  const fillBoard = (board) => {
    const emptyCell = findEmptyCell(board);
    if (!emptyCell) return true;

    const [row, col] = emptyCell;

    for (let num = 1; num <= 9; num++) {
      if (isValid(board, row, col, num)) {
        board[row][col] = num;
        if (fillBoard(board)) return true;
        board[row][col] = 0;
      }
    }
    return false;
  };

  const findEmptyCell = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) return [row, col];
      }
    }
    return null;
  };

  fillBoard(board);

  // Remove some cells to create a puzzle
  for (let i = 0; i < 40; i++) {
    const row = Math.floor(Math.random() * 9);
    const col = Math.floor(Math.random() * 9);
    board[row][col] = 0;
  }

  return board;
};

const Sudoku = () => {
  const [board, setBoard] = useState(generateRandomBoard);
  const [initialBoard, setInitialBoard] = useState(generateRandomBoard());
  const [solvedBoard, setSolvedBoard] = useState(generateRandomBoard());
  const [message, setMessage] = useState("");
  const [solved, setSolved] = useState(0);
  const [showInstructions, setShowInstructions] = useState(false);

  useEffect(() => {
    const newBoard = generateRandomBoard();
    setInitialBoard(newBoard);
    setBoard(newBoard);
    const solved = JSON.parse(JSON.stringify(newBoard)); // Deep copy the board
    solve(solved);
    setSolvedBoard(solved);
  }, []);

  const solve = (board) => {
    for (let row = 0; row < 9; row++) {
      for (let col = 0; col < 9; col++) {
        if (board[row][col] === 0) {
          for (let num = 1; num <= 9; num++) {
            if (isValid(board, row, col, num)) {
              board[row][col] = num;
              if (solve(board)) return true;
              board[row][col] = 0;
            }
          }
          return false;
        }
      }
    }
    return true;
  };

  const handleSolve = () => {
    const newBoard = JSON.parse(JSON.stringify(initialBoard)); // Use initialBoard here
    solve(newBoard);
    setBoard(newBoard);
  };

  const handleChange = (row, col, event) => {
    const value = event.target.value;
    if (value === "" || /^[1-9]$/.test(value)) {
      const newBoard = board.map((r) => [...r]);
      newBoard[row][col] = value === "" ? 0 : parseInt(value, 10);
      setBoard(newBoard);
    }
  };

  const handleReset = () => {
    setBoard(initialBoard.map((row) => [...row]));
    setMessage("");
    setSolved(0);
  };

  const hasChanges = () => {
    return !board.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === initialBoard[rowIndex][colIndex])
    );
  };

  const handleCheck = () => {
    if (!hasChanges()) {
      setMessage("Please make some changes to the board before evaluating.");
      return;
    }

    const isSolved = board.every((row, rowIndex) =>
      row.every((cell, colIndex) => cell === solvedBoard[rowIndex][colIndex])
    );
    setSolved(isSolved);
    setMessage(
      isSolved ? "You have solved the Sudoku!" : "Your solution is wrong."
    );
  };

  const handleInstructions = () => {
    setShowInstructions(true);
  };

  const closeInstructions = () => {
    setShowInstructions(false);
  };

  return (
    <div className="sudoku">
      <h1>Sudoku</h1>
      
      <div className="sudoku-content">
        {solved == 1 && <Lottie className="animation" animationData={success} />}
        <div
          className="board"
          style={{
            borderWidth: "2px",
            borderStyle: "solid",
          }}
        >
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="row">
              {row.map((cell, colIndex) => (
                <input
                  key={colIndex}
                  type="text"
                  value={cell === 0 ? "" : cell}
                  onChange={(e) => handleChange(rowIndex, colIndex, e)}
                  className={`cell ${getCellClass(rowIndex, colIndex)}`}
                  maxLength="1"
                />
              ))}
            </div>
          ))}
        </div>
        {solved == 1 && <Lottie className="animation" animationData={success} />}
      </div>
      <div className="buttons">
        <button onClick={handleSolve}>See Solution</button>
        <button onClick={handleReset}>Reset</button>
        <button onClick={handleCheck}>Evaluate</button>
        <button className="instructions-btn" onClick={handleInstructions}>?</button>
      </div>
      {message && (
        <div
          className="message"
          style={{ fontSize: "1.2rem", color: "chocolate" }}
        >
          {message}
        </div>
      )}
      {showInstructions && <Modal onClose={closeInstructions} />} {/* Show modal */}
    </div>
  );
};

const getCellClass = (row, col) => {
  const isTopLeft = row < 3 && col < 3;
  const isTopMiddle = row < 3 && col >= 3 && col < 6;
  const isTopRight = row < 3 && col >= 6;
  const isMiddleLeft = row >= 3 && row < 6 && col < 3;
  const isMiddleMiddle = row >= 3 && row < 6 && col >= 3 && col < 6;
  const isMiddleRight = row >= 3 && row < 6 && col >= 6;
  const isBottomLeft = row >= 6 && col < 3;
  const isBottomMiddle = row >= 6 && col >= 3 && col < 6;
  const isBottomRight = row >= 6 && col >= 6;

  if (isTopLeft) return "top-left";
  if (isTopMiddle) return "top-middle";
  if (isTopRight) return "top-right";
  if (isMiddleLeft) return "middle-left";
  if (isMiddleMiddle) return "middle-middle";
  if (isMiddleRight) return "middle-right";
  if (isBottomLeft) return "bottom-left";
  if (isBottomMiddle) return "bottom-middle";
  if (isBottomRight) return "bottom-right";

  return "";
};

export default Sudoku;
