import React from "react";
import { Route } from "react-router-dom";
import Problems from "../pages/Problems";
import IndividualProblem from "../pages/Individual Problem/IndividualProblem";
import LevelWiseProblemSet from "../pages/LevelWiseProblemSet";

const ProblemRoutes = () => (
  <>
    <Route path="/problems" element={<Problems />} />
    <Route path="/problems/:levelName/:ID" element={<IndividualProblem />} />
    <Route path="/problems/:levelName" element={<LevelWiseProblemSet />} />
  </>
);

export default ProblemRoutes;
