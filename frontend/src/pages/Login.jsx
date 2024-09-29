import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import "./../styles/login.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Tooltip } from "@chakra-ui/react";
import home from "../assets/images/home.png";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const [error, setError] = useState("");
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
      console.log(response.data);
      if (response.status === 200) {
        // alert(
        //   response.data
        // );
        dispatch({ type: "LOGIN_SUCCESS", payload: response.data });
        navigate("/home");
      } else {
        if (response.status === 404) {
          setError("User Not Found");
          Swal.fire({
            icon: "error",
            text: "User Not Found",
          });
        }
        if (response.status === 401) {
          setError("Incorrect Password! Please try again.");
          Swal.fire({
            icon: "error",
            text: "Incorrect Password! Please try again.",
          });
        }
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
        {error && <div style={{ color: "red" }}>{error}</div>}
        <button className="button" type="submit">
          Login
        </button>
        <label
         onClick={()=>{navigate("/register")}}
          style={{
            marginBottom: "2rem",
            fontSize: "0.8rem",
            fontFamily: "serif",
            cursor:"pointer"
          }}
        >
          Not a Giraffine Member yet?
        </label>
      </form>
      <Tooltip label="Back to Home" fontSize="md" placement="top">
        <img
          style={{ width: "2%", cursor: "pointer" }}
          onClick={() => {
            navigate("/");
          }}
          src={home}
        />
      </Tooltip>
    </div>
  );
};

export default Login;
