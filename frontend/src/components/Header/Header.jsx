import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/data/animationData/header.json";
import logo from "../../assets/images/logo.png";
import { AuthContext } from "../../context/AuthContext";
import logout from "../../assets/images/logout.png";
import axios from "axios";
import ConfirmDialog from "../Dialog/ConfirmDialog.js";
import Menu from "../Menu/Menu.jsx";

import "./header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const rankColors = {
    Mastermind: "#ff0037",
    Challenger: "orange",
    Adventurer: "blueviolet",
    Explorer: "blue",
    Learner: "#4CAF50",
  };

  const handleClose = () => {
    setOpen(false);
  };

  const userCredentials = {
    email:  user?.email,
    password: user?.password,
  };

  const handleConfirm = async () => {
    setOpen(false);
    try {
      const response = await axios.post(
        "http://localhost:8080/user/logout",
        userCredentials
      );
      console.log(response.data);
      if (response.status === 200) {
        dispatch({ type: "LOGOUT" });
        navigate("/login");
      }
    } catch (error) {
      console.log(error)
    }
  };

  const logoutHandler = () => {
    setOpen(true);
  };

  return (
    <div className="header">
      <Link to="/">
        <img className="logo" src={logo} alt="logo" />
      </Link>
      {!user && <Lottie className="animation" animationData={animationData} />}
      {user && (
        <>
          <Menu />
          <div className="user">
            <label>
              <Link to="/profile">
                {" "}
                <label
                  style={{
                    color: `${rankColors[user.rank]}`,
                    cursor: "pointer",
                  }}
                >
                  {user.firstName}
                </label>{" "}
              </Link>
            </label>
            <img src={logout} onClick={logoutHandler} />
            <ConfirmDialog
              open={open}
              handleClose={handleClose}
              handleConfirm={handleConfirm}
              message="You are about to logout from giraffine?"
            />
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
