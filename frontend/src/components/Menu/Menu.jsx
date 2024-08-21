import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./menu.css";

import problems from "../../assets/images/problems.png";
import competition from "../../assets/images/competition.png";
import articles from "../../assets/images/articles.png";
import tutorial from "../../assets/images/tutorial.png";
import leaderboard from "../../assets/images/leaderboard.png";

const Menu = () => {
  const location = useLocation();

  // Helper function to check if the keyword is in the current pathname
  const isActive = (keyword) => location.pathname.includes(keyword);

  return (
    <div className="menu">
      <Link to="/problems">
        <div className={`item ${isActive("problems") ? "active" : ""}`}>
          <img src={problems} alt="Problems" />
          Problems
        </div>
      </Link>
      <Link to="/contests">
        <div className={`item ${isActive("contests") ? "active" : ""}`}>
          <img src={competition} alt="Competition" />
          Contests
        </div>
      </Link>
      <Link to="/articles">
        <div className={`item ${isActive("articles") ? "active" : ""}`}>
          <img src={articles} alt="Articles" />
          Articles
        </div>
      </Link>
      <Link to="/tutorials">
        <div className={`item ${isActive("tutorials") ? "active" : ""}`}>
          <img src={tutorial} alt="Tutorials" />
          Tutorials
        </div>
      </Link>
      <Link to="/leaderboard">
        <div className={`item ${isActive("leaderboard") ? "active" : ""}`}>
          <img src={leaderboard} alt="Leaderboard" />
          Leaderboard
        </div>
      </Link>
    </div>
  );
};

export default Menu;
