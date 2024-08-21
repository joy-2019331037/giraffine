import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import AuthRoutes from "./AuthRoutes";
import HomeRoutes from "./HomeRoutes";
import ContestRoutes from "./ContestRoutes";
import TutorialRoutes from "./TutorialRoutes";
import ProblemRoutes from "./ProblemRoutes";

const Routers = () => {
  return (
    <Routes>
      <AuthRoutes />
      <HomeRoutes />
      <ContestRoutes />
      <TutorialRoutes />
      <ProblemRoutes/>
    </Routes>
  );
};

export default Routers;
