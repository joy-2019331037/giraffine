import React from 'react';
import './modal.css'; // For modal styling

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{color:"chocolate"}}>Sudoku Game Rules</h3>
        <ul>
          <li><strong style={{color:"green"}}><p>Objective</p></strong> Fill the 9x9 grid so that each column, row, and 3x3 subgrid contain all digits from 1 to 9 exactly once.</li>
          <li><strong style={{color:"green"}}><p>How to Play</p></strong>
            <ul>
              <li><strong>Input Numbers:</strong> Click on any empty cell and type a number from 1 to 9.</li>
              {/* <li><strong>Check Solution:</strong> Use the "Evaluate" button to check if your current solution is correct.</li>
              <li><strong>See Solution:</strong> Click "See Solution" to reveal the completed puzzle and compare it with your solution.</li> */}
              <li><strong>Reset:</strong> Click "Reset" to revert to the original puzzle.</li>
            </ul>
          </li>
          <li><strong style={{color:"green"}}><p>Rules</p></strong>
            <ul>
              <li>Each number must appear only once in each row, column, and 3x3 subgrid.</li>
              <li>Only numbers between 1 and 9 are allowed.</li>
            </ul>
          </li>
          <li><strong style={{color:"green"}}><p>Tips</p></strong>
            <ul>
              <li>If you're unsure, use pen and paper to keep track of possible numbers for each cell.</li>
              <li>Start filling in cells with the fewest possible options first to simplify the puzzle.</li>
            </ul>
          </li>
        </ul>
        <p><button onClick={onClose}>Close</button></p>
      </div>
    </div>
  );
};

export default Modal;
