import React, { useRef } from 'react';
import Lottie from 'lottie-react';
import animationData from '../../assets/data/header.json';
import './footer.css';
import logo from '../../assets/images/logo.png';
const Header = () => {
  return (
    <div className="footer">
    <img src={logo}/>
    <div className='fotenote'>
        Powered By GIRAFFINE
    </div>
      <Lottie className='animation'
        animationData={animationData}
      />
    </div>
  );
};

export default Header;
