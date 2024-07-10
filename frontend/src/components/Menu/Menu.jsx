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

  return (
    <div className="menu">
      <Link to="/problems">
        <div className={`item ${location.pathname === "/problems" ? "active" : ""}`}>
          <img src={problems} alt="Problems" />
          Problems
        </div>
      </Link>
      <Link to="/competition">
        <div className={`item ${location.pathname === "/competition" ? "active" : ""}`}>
          <img src={competition} alt="Competition" />
          Competition
        </div>
      </Link>
      <Link to="/articles">
        <div className={`item ${location.pathname === "/articles" ? "active" : ""}`}>
          <img src={articles} alt="Articles" />
          Articles
        </div>
      </Link>
      <Link to="/tutorials">
        <div className={`item ${location.pathname === "/tutorials" ? "active" : ""}`}>
          <img src={tutorial} alt="Tutorials" />
          Tutorials
        </div>
      </Link>
      <Link to="/leaderboard">
        <div className={`item ${location.pathname === "/leaderboard" ? "active" : ""}`}>
          <img src={leaderboard} alt="Leaderboard" />
          Leaderboard
        </div>
      </Link>
    </div>
  );
};

export default Menu;
