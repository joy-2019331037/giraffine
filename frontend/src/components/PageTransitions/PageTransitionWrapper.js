import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useLocation } from "react-router-dom";
import "./pageTransitions.css"; // CSS file for the transition styles

const PageTransitionWrapper = ({ children }) => {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="fade"
        timeout={300}
      >
        {children}
      </CSSTransition>
    </TransitionGroup>
  );
};

export default PageTransitionWrapper;
