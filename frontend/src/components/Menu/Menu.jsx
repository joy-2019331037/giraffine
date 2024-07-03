import React from "react";
import "./menu.css";

import problems from "../../assets/images/problems.png";
import competition from "../../assets/images/competition.png";
import articles from "../../assets/images/articles.png";
import tutorial from "../../assets/images/tutorial.png";
import leaderboard from "../../assets/images/leaderboard.png";
import { Link } from "react-router-dom";

const Menu = () => {
  return (
    <div className="menu">
      <Link to="/problems">
        <div className="item">
          <img src={problems} />
          Problems
        </div>
      </Link>

      <div className="item">
        <img src={competition} />
        Competition
      </div>
      <div className="item">
        <img src={articles} />
        Articles
      </div>
      <div className="item">
        <img src={tutorial} />
        Tutotials
      </div>
      <div className="item">
        <img src={leaderboard} />
        Leaderboard
      </div>
    </div>
  );
};

export default Menu;
