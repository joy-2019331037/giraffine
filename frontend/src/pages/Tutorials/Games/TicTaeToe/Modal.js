import React from 'react';
import './modal.css'; // For modal styling

const Modal = ({ onClose }) => {
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h3 style={{ color: "chocolate" }}>Tic Tac Toe Game Rules</h3>
        <ul>
          <li><strong style={{ color: "green" }}><p>Objective</p></strong> Place three of your symbols (X or O) consecutively in a row, column, or diagonal to win.</li>
          <li><strong style={{ color: "green" }}><p>How to Play</p></strong>
            <ul>
              <li><strong>Take Turns:</strong> You and the computer take turns to place your symbols on the grid.</li>
              <li><strong>Reset:</strong> Click "Reset" to start a new game.</li>
            </ul>
          </li>
          <li><strong style={{ color: "green" }}><p>Rules</p></strong>
            <ul>
              <li>Only one move per turn is allowed.</li>
              <li>Symbols cannot be placed in an occupied cell.</li>
            </ul>
          </li>
          <li><strong style={{ color: "green" }}><p>Tips</p></strong>
            <ul>
              <li>Try to block your opponent from getting three in a row while also working towards your own winning strategy.</li>
              <li>Use the hint feature to get suggestions on possible moves.</li>
            </ul>
          </li>
        </ul>
        <p><button onClick={onClose}>Close</button></p>
      </div>
    </div>
  );
};

export default Modal;
