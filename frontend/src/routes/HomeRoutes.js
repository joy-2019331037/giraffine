import React from "react";
import { Route } from "react-router-dom";

import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard/Leaderboard";
import Articles from "../pages/Articles";
import Profile from "../pages/Profile/Profile";
import Landing from "../pages/Landing";

const homeRoutes = [
  <Route key="root" path="/" element={<Landing />} />,
  <Route key="home" path="/home" element={<Home />} />,
  <Route key="leaderboard" path="/leaderboard" element={<Leaderboard />} />,
  <Route key="articles" path="/articles" element={<Articles />} />,
  <Route key="profile" path="/profile" element={<Profile />} />,
  <Route key="users" path="/users/:userId" element={<Profile />} />
];

export default homeRoutes;
