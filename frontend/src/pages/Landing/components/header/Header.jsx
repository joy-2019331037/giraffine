
import React, { useState } from 'react';
import './header.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

function Header() {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownVisible(prevState => !prevState);
  };

  return (
    <header className="landing_header">
      {/* <a href="#" className="logo">Giraffine</a> */}
      <a href="#home" className='logo'>
        <img style={{width:"10vw"}} src='images/giraffe-logo.png'></img> 
        </a>
      <nav className="navbar">
        <a href="#home">home</a>
        <a href="#about">about us</a>
        <a href="#education">Learning levels</a>
        {/* <a href="#teacher">teacher</a> */}
        <a href="#activities">activities</a>
        {/* <a href="#gallery">gallery</a> */}
        <a href="#contact">contact</a>
      </nav>
      <div className="icons">
        <div className="user-icon" onClick={toggleDropdown}>
          <div className="fas fa-user" id="login-btn"></div>
          {isDropdownVisible && (
            <div className="dropdown-content">
              <a href="#">
                <i className="fas fa-sign-in-alt"></i> Login
              </a>
              <a href="#">
                <i className="fas fa-user-plus"></i> Sign Up
              </a>
            </div>
          )}
        </div>
        <div className="fas fa-bars" id="menu-btn"></div>
      </div>
    </header>
  );
}

export default Header;
