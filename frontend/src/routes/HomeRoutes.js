import React from "react";
import { Route } from "react-router-dom";
import Home from "../pages/Home";
import Leaderboard from "../pages/Leaderboard";
import Articles from "../pages/Articles";
import Profile from "../pages/Profile/Profile";
import Root from "../pages/Root";


const HomeRoutes = () => (
  <>
     <Route path="/" element={<Root />} />
     <Route path="/home" element={<Home />} />
    <Route path="/leaderboard" element={<Leaderboard />} />
    <Route path="/articles" element={<Articles />} />
      <Route path="/profile" element={<Profile />} />
  </>
);

export default HomeRoutes;
