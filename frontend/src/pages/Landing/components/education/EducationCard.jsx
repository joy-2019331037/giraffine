import React from 'react';
import './education.css';

function EducationCard({ title, description, image }) {
  return (
    <div className="boxes">
      <h3>{title}</h3>
      <p>{description}</p>
      <img src={image} alt="" />
    </div>
  );
}

export default EducationCard;
