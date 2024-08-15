import React, { useState, useEffect } from "react";
import * as d3 from "d3";
import "./gcdvisualizer.css";

const NQueensVisualizer = () => {
  const [n, setN] = useState(4); // Default to an 4X4 board
  const [actionMessage, setActionMessage] = useState("");
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [isAutoSimulating, setIsAutoSimulating] = useState(false);
  const [board, setBoard] = useState(Array(n).fill(-1)); // -1 means no queen placed in that row
  const [stepState, setStepState] = useState({
    row: 0,
    col: 0,
    columns: new Set(),
    diagonals1: new Set(),
    diagonals2: new Set(),
  });

  useEffect(() => {
    if (isAutoSimulating && isVisualizing) {
      const timer = setTimeout(() => {
        nextStep();
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [isAutoSimulating, stepState]);

  const nextStep = () => {
    const { row, col, columns, diagonals1, diagonals2 } = stepState;

    if (row === n) {
      setActionMessage(`Solution found!`);
      setIsVisualizing(false);
      setIsAutoSimulating(false);
      return;
    }

    for (let c = col; c < n; c++) {
      const isConflict =
        columns.has(c) || diagonals1.has(row - c) || diagonals2.has(row + c);

      visualizeAttempt(row, c, isConflict);

      if (isConflict) {
        setActionMessage(
          `Conflict at row ${row + 1}, column ${c + 1}. Trying next cell...`
        );
        setStepState({ ...stepState, col: c + 1 });
        return;
      }

      // Place the queen
      const newBoard = [...board];
      newBoard[row] = c;
      setBoard(newBoard);
      updateBoardVisualization(newBoard);

      columns.add(c);
      diagonals1.add(row - c);
      diagonals2.add(row + c);

      setActionMessage(
        `Placed queen at row ${row + 1}, column ${
          c + 1
        }. Moving to the next row...`
      );

      setStepState({
        row: row + 1,
        col: 0,
        columns: new Set(columns),
        diagonals1: new Set(diagonals1),
        diagonals2: new Set(diagonals2),
      });

      return;
    }

    // Backtrack
    setActionMessage(`Backtracking from row ${row + 1}.`);
    const lastCol = board[row - 1];
    const newColumns = new Set(columns);
    const newDiagonals1 = new Set(diagonals1);
    const newDiagonals2 = new Set(diagonals2);

    newColumns.delete(lastCol);
    newDiagonals1.delete(row - 1 - lastCol);
    newDiagonals2.delete(row - 1 + lastCol);

    const newBoard = [...board];
    newBoard[row - 1] = -1;
    setBoard(newBoard);
    updateBoardVisualization(newBoard);

    setStepState({
      row: row - 1,
      col: lastCol + 1,
      columns: newColumns,
      diagonals1: newDiagonals1,
      diagonals2: newDiagonals2,
    });
  };

  const visualizeAttempt = (row, col, isConflict) => {
    const svgSize = 500;
    const cellSize = svgSize / n;

    const svg = d3
      .select("#nqueens-visualizer")
      .attr("width", svgSize)
      .attr("height", svgSize)
    //   .style("border", "2px solid brown");

    // Draw attempted placement
    svg
      .append("text")
      .attr("x", col * cellSize + cellSize / 2)
      .attr("y", row * cellSize + cellSize / 2)
      .attr("font-size", cellSize / 2)
      .attr("text-anchor", "middle")
      .attr("alignment-baseline", "middle")
      .attr("fill", isConflict ? "red" : "grey")
      .text("♛");
  };

  const updateBoardVisualization = (board) => {
    const svgSize = 500;
    const cellSize = svgSize / n;

    const svg = d3
      .select("#nqueens-visualizer")
      .attr("width", svgSize)
      .attr("height", svgSize)
    //   .style("border", "2px solid brown");

    svg.selectAll("*").remove();

    // Draw board
    for (let i = 0; i < n; i++) {
      for (let j = 0; j < n; j++) {
        svg
          .append("rect")
          .attr("x", j * cellSize)
          .attr("y", i * cellSize)
          .attr("width", cellSize)
          .attr("height", cellSize)
          .attr("fill", (i + j) % 2 === 0 ? "#f0d9b5" : "#b58863");
      }
    }

    // Draw placed queens
    for (let i = 0; i < n; i++) {
      if (board[i] !== -1) {
        svg
          .append("text")
          .attr("x", board[i] * cellSize + cellSize / 2)
          .attr("y", i * cellSize + cellSize / 2)
          .attr("font-size", cellSize / 2)
          .attr("text-anchor", "middle")
          .attr("alignment-baseline", "middle")
          .attr("fill", "green")
          .text("♛");
      }
    }
  };

  const startVisualization = () => {
    setIsVisualizing(true);
    setActionMessage(
      "Starting visualization . . . Press Auto Simulate or Next Step"
    );
    setStepState({
      row: 0,
      col: 0,
      columns: new Set(),
      diagonals1: new Set(),
      diagonals2: new Set(),
    });
  };

  const autoSimulate = () => {
    if (!isVisualizing) startVisualization();
    setIsAutoSimulating(true);
  };

  const reset = () => {
    d3.select("#nqueens-visualizer").selectAll("*").remove();
    setActionMessage("");
    setIsVisualizing(false);
    setIsAutoSimulating(false);
    setBoard(Array(n).fill(-1));
  };

  return (
    <div className="visualizer">
      <div className="header">
        <h2>N Queens Problem Visualization</h2>
        <label>
          The N Queens problem requires placing N queens on an N x N chessboard
          so that no two queens{" "}
        </label>
        <label>
          attack each other, i.e., no two queens share the same row, column, or
          diagonal!
        </label>
      </div>
      <div className="input-container">
        <div>
          <label>Enter the board size (N) </label>
          <input
            type="number"
            value={n}
            onChange={(e) => setN(parseInt(e.target.value))}
            min="4"
            max="8"
            disabled={isVisualizing || isAutoSimulating}
          />
        </div>
      </div>
      <div className="content">
        <div className="buttons">
          <button
            onClick={startVisualization}
            disabled={isVisualizing || isAutoSimulating}
          >
            Start Visualization
          </button>
          <button onClick={autoSimulate} disabled={isAutoSimulating}>
            Auto Simulate
          </button>
          <button
            onClick={nextStep}
            disabled={!isVisualizing || isAutoSimulating}
          >
            Next Step
          </button>
          <button onClick={reset}>Reset</button>
        </div>
        <p>{actionMessage}</p>

        <svg id="nqueens-visualizer"></svg>
      </div>
    </div>
  );
};

export default NQueensVisualizer;
