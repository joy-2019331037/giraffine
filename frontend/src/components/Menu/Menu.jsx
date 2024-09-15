import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";

import problems from "../../assets/images/problems.png";
import competition from "../../assets/images/competition.png";
import articles from "../../assets/images/articles.png";
import tutorial from "../../assets/images/tutorial.png";
import leaderboard from "../../assets/images/leaderboard.png";
import community from "../../assets/images/community.png";

import { useNavigate } from "react-router-dom";

const Menu = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // Helper function to check if the keyword is in the current pathname
  const isActive = (keyword) => location.pathname.includes(keyword);

  return (
    <div className="menu">
      <div
        onClick={() => {
          navigate("/problems");
        }}
        className={`item ${isActive("problems") ? "active" : ""}`}
      >
        <img src={problems} alt="Problems" />
        Problems
      </div>

      <div
        onClick={() => {
          navigate("/contests");
        }}
        className={`item ${isActive("contests") ? "active" : ""}`}
      >
        <img src={competition} alt="Competition" />
        Contests
      </div>

      {/*
        <div className={`item ${isActive("articles") ? "active" : ""}`}>
          <img src={articles} alt="Articles" />
          Articles
        </div>
      */}
      <div
        onClick={() => {
          navigate("/community");
        }}
        className={`item ${isActive("community") ? "active" : ""}`}
      >
        <img src={community} alt="Community" />
        Community
      </div>

      <div
        onClick={() => {
          navigate("/tutorials");
        }}
        className={`item ${isActive("tutorials") ? "active" : ""}`}
      >
        <img src={tutorial} alt="Tutorials" />
        Tutorials
      </div>

      <div
        onClick={() => {
          navigate("/leaderboard");
        }}
        className={`item ${isActive("leaderboard") ? "active" : ""}`}
      >
        <img src={leaderboard} alt="Leaderboard" />
        Leaderboard
      </div>
    </div>
  );
};

export default Menu;
