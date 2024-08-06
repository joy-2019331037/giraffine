import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./../styles/profile.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import { AuthContext } from "../context/AuthContext";
import BubbleSortVisualizer from "../assets/data/visualizerData/BubbleSortVisualizer";

const Profile = () => {
  const {user, dispatch } = useContext(AuthContext);

  return (
      <>
      <div className="profile">
        HI, I am {user.firstName} {user.lastName}
      </div>
      <BubbleSortVisualizer/>
      </>
  );
};

export default Profile;
