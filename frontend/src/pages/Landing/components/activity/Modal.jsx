// Modal.js
import React from 'react';
import './activity.css'; // Add your styles here

function Modal({ isOpen, onClose, title, details }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>{title}</h2>
        <p>{details}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}

export default Modal;
