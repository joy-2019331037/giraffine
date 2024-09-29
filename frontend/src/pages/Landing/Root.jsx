import React from "react";
import './root.css';
import About from "./components/about/About.jsx";
import Activities from "./components/activity/Activity.jsx";
import Contact from "./components/contact/Contact.jsx";
import Education from "./components/education/Education.jsx";
import Footer from "./components/footer/Footer.jsx";
import Header from "./components/header/Header.jsx";
import Home from "./components/home/Home.jsx";

const Root = () => {
  return (
    <div style={{fontSize:"62.5%"}} className="root-container">
      <Header />
      <Home />
      <About />
      <Education />
      <Activities />
      <Contact />
      <Footer />
    </div>
  );
};

export default Root;
