import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Home = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  return <div>
    
  </div>;
};

export default Home;
