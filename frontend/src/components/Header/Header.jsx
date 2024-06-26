import React from "react";
import {Link} from 'react-router-dom';
import Lottie from 'lottie-react';
import animationData from '../../assets/data/header.json';
import logo from "../../assets/images/transparent-logo.png";
import './header.css';

const Header = () => {
  return (
    <div className="header">
      <Link to="/"><img src={logo} alt="logo"/></Link>
      <Lottie className="animation" animationData={animationData}/>
    </div>
  );
};

export default Header;
