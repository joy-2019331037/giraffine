import React from "react";
import { Link } from "react-router-dom";
import { Text } from "@chakra-ui/react";

import sudoku from "../../../assets/images/game/sudoku.png";
import ticTacToe from "../../../assets/images/game/tictactoe.png";

import "./games.css";

const Games = () => {
  return (
    <>
      <h2 style={{ textAlign: "center" }}>Games</h2>
      <div className="games">
        <Link to="/tutorials/games/tictactoe">
          <div>
            <h3>Tic Tac Toe</h3>

            <img src={ticTacToe} />

            <Text className="gameIntro" whiteSpace="pre-line">Challenge yourself
               in the classic game of Tic Tac Toe!  Tic Tac Toe is the classic duel of X's and O's where strategy meets quick thinking! Easy to learn, but can you 
               outsmart the computer on hard mode?</Text>
          </div>
        </Link>
        <Link to="/tutorials/games/suduko">
          <div>
            <h3> Sudoku</h3>
            <img src={sudoku} />
            <Text className="gameIntro" whiteSpace="pre-line"> Ready to test your brainpower? Dive into the timeless 
              puzzle of Sudoku! Fill in the numbers, avoid duplicates, and watch your 
              problem-solving skills soar. From beginners to experts, Sudoku has an appeal for everyone!</Text>
          </div>
        </Link>
      </div>
    </>
  );
};

export default Games;
