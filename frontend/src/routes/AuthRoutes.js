import React from "react";
import { Route } from "react-router-dom";

import Register from "../pages/Register";
import OtpVerification from "../pages/OtpVerification";
import Login from "../pages/Login";

const authRoutes = [
  <Route key="register" path="/register" element={<Register />} />,
  <Route
    key="otpVerification"
    path="/otpVerification"
    element={<OtpVerification />}
  />,
  <Route key="login" path="/login" element={<Login />} />,
];

export default authRoutes;
