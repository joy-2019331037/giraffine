import React from "react";
import { Route } from "react-router-dom";
import CommunityQueries from "../pages/Community/CommunityQueries";

const CommunityRoutes = [
  <Route key="communityQueries" path="/community" element={<CommunityQueries />} />,
];

export default CommunityRoutes;
