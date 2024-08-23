import React from "react";
import { Route } from "react-router-dom";
import Problems from "../pages/Problems";
import IndividualProblem from "../pages/Individual Problem/IndividualProblem";
import LevelWiseProblemSet from "../pages/LevelWiseProblemSet";

const problemRoutes = [
  <Route key="problems" path="/problems" element={<Problems />} />,
  <Route key="individualProblem" path="/problems/:levelName/:ID" element={<IndividualProblem />} />,
  <Route key="levelWiseProblemSet" path="/problems/:levelName" element={<LevelWiseProblemSet />} />
];

export default problemRoutes;
