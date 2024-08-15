import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./../styles/login.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";


import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const userCredentials = {
      email: email,
      password: pass,
    };
    dispatch({ type: "LOGIN_START" });
    try {
      const response = await axios.post(
        "http://localhost:8080/user/login",
        userCredentials
      );
      if (response.status === 200) {
        // alert(
        //   response.data
        // );
        console.log(response)
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data});
        navigate("/home");  
      }
    } catch (error) {
      //alert(error.response.data);
      dispatch({ type: "LOGIN_FAILURE", payload: error.message });
      navigate("/login");
    }
  };

  return (
      <div className="login">
        {/* <Lottie className="reg_anime" animationData={animationData}/> */}
        <form className="login_form" onSubmit={handleSubmit}>
          <h2>Sign In</h2>

          <div>
            <label htmlFor="email">Email Address</label>
            <input
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label htmlFor="pass">Password</label>
            <input
              type="password"
              id="password"
              value={pass}
              onChange={(e) => setPass(e.target.value)}
              required
            />
          </div>

          <button className="button" type="submit">
            Login
          </button>
        </form>
      </div>
  );
};

export default Login;
