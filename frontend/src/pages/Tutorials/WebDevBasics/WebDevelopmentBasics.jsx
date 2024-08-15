import React from "react";

import Practice from "./../../../assets/images/WebDev/practice.png";
import Resource from "./../../../assets/images/WebDev/resource.png";
import Tutorial from "./../../../assets/images/WebDev/webTutorial.png";
import "./webdevbasics.css";
import { Link } from "react-router-dom";

const WebDevelopmentBasics = () => {
  return (
    <div className="webdevbasics">
      <h2>Web Development Basics</h2>
      <div className="case">
        <Link to="/tutorials/webDevelopmentBasics/webDevTutorials">
          <div className="element">
            <h3>Tutorials</h3>
            <img src={Tutorial} alt="Practice" />
            <div>Explore the web development, one lesson at a time.</div>
          </div>
        </Link>
        
        <Link to="/tutorials/webDevelopmentBasics/Practice">
          <div className="element">
            <h3>Practice Challanges</h3>
            <img src={Practice} alt="Pratice" />
            <div>
              Get inspired by hands-on examples and bring your ideas to life.
            </div>
          </div>
        </Link>

        <Link to="/tutorials/webDevelopmentBasics/Resources">
          <div className="element">
            <h3>Resources</h3>
            <img src={Resource} alt="Resource" />
            <div>Your go-to toolkit for web development.</div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default WebDevelopmentBasics;
