import React from "react";
import { Link } from "react-router-dom";
import "./tutorials.css";

import fox from "../../assets/data/animationData/fox.json";

import programming from "../../assets/images/programmingBasics.png";
import development from "../../assets/images/developmentBasics.png";
import games from "../../assets/images/games.png";
import visualizer from "../../assets/images/visualizer.png";

import Lottie from "lottie-react";
import "animate.css/animate.min.css";

const Tutorials = () => {
  return (
    <>
      <div style={{textAlign:"center", fontSize:"2rem", marginBottom:"2rem", color:"chocolate"}}>Tutorials</div>
      <div className="tutorials">
        <div className="pre">
        <Link to="/tutorials/basicProgrammingConcepts">
          <div>
            <img
              src={programming}
              className="animate__animated animate__fadeIn animate__slower mx-auto mb-4"
              alt="Programming"
            />
            <label className="animate__zoomIn animate__bounceIn animate__slower text-xl font-bold text-white bg-blue-500 rounded-full px-4 py-2">
              Basic Programing Concepts
            </label>
            <p className="animate__animated animate__fadeInUp animate__slower mt-4 text-gray-700">
              Start your coding journey here! Our Basic Programming Concepts
              section makes learning the essentials a breeze. With clear
              explanations, fun examples, and interactive exercises, you’ll
              build a strong foundation in no time. Get ready to code like a
              pro!
            </p>
          </div>
          </Link>

          <Link to="/tutorials/algoVisualizer">
            <div>
              <img
                src={visualizer}
                className="animate__animated animate__fadeIn animate__slower mx-auto mb-4"
              />
              <label className="animate__zoomIn animate__bounceIn animate__slower text-xl font-bold text-white bg-blue-500 rounded-full px-4 py-2">
                Algorithm Visualizer
              </label>
              <p className="animate__animated animate__fadeInUp animate__slower mt-4 text-gray-700">
                Discover the magic of algorithms! Dive into our Algorithm
                Visualizer, where you can see complex ideas come to life. Watch
                and interact as we break down big problems into small,
                easy-to-understand steps. Learning algorithms has never been
                this fun!
              </p>
            </div>
          </Link>
        </div>
        <div className="mid">
          <Lottie animationData={fox} />
        </div>
        <div className="post">
        <Link to="/tutorials/games">
          <div class="post-container">
            <img
              src={games}
              className="animate__animated animate__fadeIn animate__slower mx-auto mb-4"
            />
            <label className="animate__zoomIn animate__bounceIn animate__slower">
              Games
            </label>
            <p className="animate__animated animate__fadeInUp animate__slower">
              Let’s play and learn! In our Games section, coding meets
              adventure. Create and play your own games while mastering
              programming skills. From simple puzzles to exciting quests, every
              game is a step towards becoming a coding champion!
            </p>
          </div>
          </Link>
          <Link to="/tutorials/webDevelopmentBasics">
          <div class="post-container">
            <img
              src={development}
              className="animate__animated animate__fadeIn animate__slower mx-auto mb-4"
            />
            <label className="animate__zoomIn animate__bounceIn animate__slower text-xl font-bold text-white bg-blue-500 rounded-full px-4 py-2">
              Web Development Basics
            </label>
            <p className="animate__animated animate__fadeInUp animate__slower mt-4 text-gray-700">
              Build your own corner of the internet! In Web Development Basics,
              we’ll guide you through creating amazing websites from scratch.
              Learn HTML, CSS, and JavaScript to bring your ideas to life
              online. Your journey to becoming a web wizard starts here!
            </p>
          </div>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Tutorials;
