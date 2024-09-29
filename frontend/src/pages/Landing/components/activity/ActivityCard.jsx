import Lottie from "lottie-react";
import React, { useState } from "react";
import "./activity.css";

function ActivityCard({ title, animation, details }) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  return (
    <>
      <div className="box" onClick={toggleDetails}>
        <Lottie className="lottie" animationData={animation} />
        <h3>{title}</h3>
      </div>

      {isOpen && (
        <div className="modal-overlay">
          <div className="modal-card">
            <button className="close-btn" onClick={closeModal}>
              ×
            </button>
            <Lottie className="lottie large" animationData={animation} />
            <h3>{title}</h3>
            <div className="details">
              <p>{details}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ActivityCard;
