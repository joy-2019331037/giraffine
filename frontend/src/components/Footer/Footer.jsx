import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/data/panda.json";
import "./footer.css";
import logo from "../../assets/images/transparent-logo.png";

const Header = () => {
  return (
    <>
      <div className="footerDiv">
        {/* <svg
          className="footerSvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFDEBA"
            fill-opacity="1"
            d="M0,64L60,90.7C120,117,240,171,360,165.3C480,160,600,96,720,80C840,64,960,96,1080,101.3C1200,107,1320,85,1380,74.7L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg> */}
        {/* <svg
          className="footerSvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 350"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFDEBA"
            fill-opacity="1"
            d="M0,32L60,37.3C120,43,240,53,360,58.7C480,64,600,64,720,74.7C840,85,960,107,1080,101.3C1200,96,1320,64,1380,48L1440,32L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"
          ></path>
        </svg> */}
        <svg
          className="footerSvg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 330"
          preserveAspectRatio="none"
        >
          <path
            fill="#FFDEBA"
            fill-opacity="1"
            d="M0,32L80,58.7C160,85,320,139,480,138.7C640,139,800,85,960,64C1120,43,1280,53,1360,58.7L1440,64L1440,320L1360,320C1280,320,1120,320,960,320C800,320,640,320,480,320C320,320,160,320,80,320L0,320Z"
          ></path>
        </svg>

        <div className="footer">
          <img src={logo} alt="logo" />
          <div className="fotenote">Powered By GIRAFFINE</div>
          <Lottie className="animation" animationData={animationData} />
        </div>
      </div>
    </>
  );
};

export default Header;
