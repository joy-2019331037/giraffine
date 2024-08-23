import React from "react";
import { Route } from "react-router-dom";
import Contests from "../pages/Contests/Contests";
import ContestPreview from "../pages/Contests/ContestPreview";
import ContestProblem from "../pages/Contests/IndividualContest/ContestProblem";
import IndividualContest from "../pages/Contests/IndividualContest/IndividualContest"

const contestRoutes = [
  <Route key="contests" path="/contests" element={<Contests />} />,
  <Route
    key="contestpreview"
    path="/contests/preview/:contestId"
    element={<ContestPreview />}
  />,
  <Route
    key="individualcontest"
    path="/contests/:contestId"
    element={<IndividualContest />}
  />,
  <Route
  key="individualcontestproblem"
  path="/contests/:contestId/:problemId"
  element={<ContestProblem />}
/>,
];

export default contestRoutes;
