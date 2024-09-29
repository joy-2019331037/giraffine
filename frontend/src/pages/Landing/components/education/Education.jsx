import Lottie from "lottie-react";
import React from "react";
import aiBasedLearning from "./AI.json";
import contestAnimation from "./contest.json";
import "./education.css";
import learnerPanda from "./learner_panda.json";
import learnerSheep from "./learner_sheep.json";

import Learner from "../../../../assets/images/levels/sprout.png";
import Explorer from "../../../../assets/images/levels/explorer.png";
import Adventurer from "../../../../assets/images/levels/adventurer.png";
import Challenger from "../../../../assets/images/levels/challenger.png";
import Mastermind from "../../../../assets/images/levels/mastermind.png";

function Education() {
  return (
    <section className="landing_education">
      <h1 style={{ fontSize: "2.5rem" }} className="heading">
        Rank Based <span>Problem Solving</span> <br />
        with Giraffine
      </h1>

      <div className="horizontal-card-container">
        <div className="horizontal-card">
          <img src={Learner} />
          <div className="horizontal-content">
            <h3>Learner</h3>
            <i style={{ color: "green", fontSize: "1rem" }}>rating: 0+</i>{" "}
            <p
              style={{
                margin: "1rem 0rem",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Every Great Journey Starts with a Single Step
            </p>
            <p>
              Welcome to the world of coding! As a Learner, this is the stage for you where
              you’ll explore the basics of programming, solve your first
              problems, and discover the endless possibilities of coding. Ready
              to start?
            </p>
          </div>
        </div>
        <div className="horizontal-card">
          <img src={Explorer} />
          <div className="horizontal-content">
            <h3>Explorer</h3>

            <i style={{ color: "green", fontSize: "1rem" }}>rating: 130+</i>

            <p
              style={{
                margin: "1rem 0rem",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Uncover New Territories of Code
            </p>
            <p>
              As an Explorer, you’ve taken your first strides into the vast
              world of programming. Now, it’s time to dive deeper! You’ll be
              challenged with more intriguing problems in thi stage. Keep going, there’s so much
              more to discover!
            </p>
          </div>
        </div>
        <div className="horizontal-card">
          <img src={Adventurer} />
          <div className="horizontal-content">
            <h3>Adventurer</h3>

            <i style={{ color: "green", fontSize: "1rem" }}>rating: 210+</i>

            <p
              style={{
                margin: "1rem 0rem",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Braving the Challenges Ahead
            </p>
            <p>
              This is the Adventurer rank, where the challenges get
              tougher and the rewards greater. Here, your skills are put to the
              test, as you face more complex problems. Gear up, the adventure is just getting
              started!
            </p>
          </div>
        </div>

        <div className="horizontal-card">
          <img src={Challenger} />
          <div className="horizontal-content">
            <h3>Challenger</h3>

            <i style={{ color: "green", fontSize: "1rem" }}>rating: 290+</i>

            <p
              style={{
                margin: "1rem 0rem",
                fontWeight: "bold",
                fontFamily: "cursive",
              }}
            >
              Rising to Every Challenge
            </p>
            <p>
              As a Challenger, no
              problem would be too tough for you. This
              rank is for those who don’t just solve problems—they conquer them.
              Are you ready to take on the most exciting challenges?
            </p>
          </div>
        </div>

        <div className="horizontal-card">
          <img src={Mastermind} />
          <div className="horizontal-content">
            <h3>Mastermind</h3>

            <i style={{ color: "green", fontSize: "1rem" }}>rating: 370+</i>

            <p
              style={{
                margin: "1rem 0rem",
                fontWeight: "bold",
                fontFamily: "cursive",
                
              }}
            >
              Mastering the Code, Shaping the Future
            </p>
            <p>
              As a Mastermind, you would reach the pinnacle of
              coding excellence. You would not just solve problems—you would
              create solutions. Keep pushing the boundaries,
              and continue to innovate!
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Education;
