import React from "react";

import Lottie from 'lottie-react';
import animationData from '../../assets/data/header.json';
import logo from "../../assets/images/logo.png";
import './header.css';

const Header = () => {
  return (
    <div className="header">
      <img src={logo} alt="logo"/>
      
    </div>
  );
};

export default Header;
