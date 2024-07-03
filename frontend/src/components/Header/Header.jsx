import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import animationData from "../../assets/data/animationData/header.json";
import logo from "../../assets/images/transparent-logo.png";
import { AuthContext } from "../../context/AuthContext";
import logout from "../../assets/images/logout.png";

import ConfirmDialog from "../Dialog/ConfirmDialog.js";
import Menu from "../Menu/Menu.jsx";

import "./header.css";

const Header = () => {
  const [open, setOpen] = useState(false);
  const { user, dispatch } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    setOpen(false);
    dispatch({ type: "LOGOUT" });
    navigate("/login");
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
            {/* <Lottie className="animation" animationData={animationData} /> */}
            <label>
              <Link to="/profile"> {user.firstName} </Link>
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
