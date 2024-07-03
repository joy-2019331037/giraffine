import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./../styles/profile.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";

import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const {user, dispatch } = useContext(AuthContext);

  return (
      <div className="profile">
        HI, I am {user.firstName} {user.lastName}
      </div>
  );
};

export default Profile;
