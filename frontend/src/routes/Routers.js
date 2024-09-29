import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import authRoutes from "./AuthRoutes";
import homeRoutes from "./HomeRoutes";
import contestRoutes from "./ContestRoutes";
import tutorialRoutes from "./TutorialRoutes";
import problemRoutes from "./ProblemRoutes";
import ThreeDotLoader from "../components/ThreeDotLoader/ThreeDotloader";
import CommunityRoutes from "./CommunityRoutes";
import {ChatbotScript} from "./../components/Bot/Chatbot"; // Ensure correct import path

const Routers = () => {
  const location = useLocation();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      setLoading(false);
    }, 700); // Adjust the timeout for the animation

    return () => clearTimeout(timer);
  }, [location]);

  // List of paths where you want the chatbot to be displayed
  const allowedPaths = ['/problems', '/home'];

  return (
    <>
      {loading ? (
        <ThreeDotLoader />
      ) : (
        <TransitionGroup>
          <CSSTransition key={location.key} classNames="fade" timeout={300}>
            <Routes location={location} key={location.pathname}>
              {authRoutes}
              {homeRoutes}
              {contestRoutes}
              {tutorialRoutes}
              {problemRoutes}
              {CommunityRoutes}
            </Routes>
          </CSSTransition>
        </TransitionGroup>
      )}
     
      {/* <ChatbotScript allowedPaths={allowedPaths} /> */}
    </>
  );
};

export default Routers;


// import React, { useState, useEffect } from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import { CSSTransition, TransitionGroup } from "react-transition-group";

// import authRoutes from "./AuthRoutes";
// import homeRoutes from "./HomeRoutes";
// import contestRoutes from "./ContestRoutes";
// import tutorialRoutes from "./TutorialRoutes";
// import problemRoutes from "./ProblemRoutes";
// import ThreeDotLoader from "../components/ThreeDotLoader/ThreeDotloader";
// import CommunityRoutes from "./CommunityRoutes";
// import { ChatbotScript } from "../components/Bot/Chatbot";


// const Routers = () => {
//   const location = useLocation();
//   const [loading, setLoading] = useState(false);

//   useEffect(() => {
//     setLoading(true);

//     const timer = setTimeout(() => {
//       setLoading(false);
//     }, 700); // Adjust the timeout for the animation

//     return () => clearTimeout(timer);
//   }, [location]);

//   return (
//     <>
//       {loading ? (
//         <ThreeDotLoader />
//       ) : (
//         <TransitionGroup>
//           <CSSTransition key={location.key} classNames="fade" timeout={300}>
//             <Routes location={location} key={location.pathname}>
//               {authRoutes}
//               {homeRoutes}
//               {contestRoutes}
//               {tutorialRoutes}
//               {problemRoutes}
//               {CommunityRoutes}
//               <ChatbotScript/>
//             </Routes>
//           </CSSTransition>
//         </TransitionGroup>
//       )}
//     </>
//   );
// };

// export default Routers;


// import React from "react";
// import { Routes, Route, useLocation } from "react-router-dom";
// import PageTransitionWrapper from "../components/PageTransitions/PageTransitionWrapper";

// import authRoutes from "./AuthRoutes";
// import homeRoutes from "./HomeRoutes";
// import contestRoutes from "./ContestRoutes";
// import tutorialRoutes from "./TutorialRoutes";
// import problemRoutes from "./ProblemRoutes";

// const Routers = () => {
//   const location = useLocation();

//   return (
//     <PageTransitionWrapper>
//       <Routes location={location} key={location.pathname}>
//         {authRoutes}
//         {homeRoutes}
//         {contestRoutes}
//         {tutorialRoutes}
//         {problemRoutes}
//       </Routes>
//     </PageTransitionWrapper>
//   );
// };

// export default Routers;
