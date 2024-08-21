import React from "react";
import { Route } from "react-router-dom";
import Register from "../pages/Register";
import OtpVerification from "../pages/OtpVerification";
import Login from "../pages/Login";

const AuthRoutes = () => (
  <>
    <Route path="/register" element={<Register />} />
    <Route path="/otpVerification" element={<OtpVerification />} />
    <Route path="/login" element={<Login />} />
  </>
);

export default AuthRoutes;
