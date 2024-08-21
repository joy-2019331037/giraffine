import React from "react";
import { Route } from "react-router-dom";
import Contests from "../pages/Contests/Contests";
import ContestPreview from "../pages/Contests/ContestPreview";
import IndividualContest from "../pages/Contests/IndividualContest";

const ContestRoutes = () => (
  <>
    <Route path="/contests" element={<Contests />} />
    <Route path="/contests/preview/:contestId" element={<ContestPreview />} />
    <Route path="/contests/:contestId" element={<IndividualContest />} />
  </>
);

export default ContestRoutes;
