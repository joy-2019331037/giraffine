import React, { useState } from "react";
import axios from "axios";
import "./../styles/register.css";
import { useNavigate } from "react-router-dom";
import Lottie from "lottie-react";
import Swal from "sweetalert2";
import { Tooltip } from "@chakra-ui/react";
import home from "../assets/images/home.png";
import animationData from "../assets/data/animationData/panda_2.json";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  const [confirmTouched, setConfirmTouched] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pass,
      rank: "Learner",
      activeStatus: "Offline",
      isVerified: "",
      friends: [],
      problemsSolved: {
        learner: 0, // Initialize with 0 problems solved for the "learner" rank
      },
    };

    try {
      const response = await axios.post(
        "http://localhost:8080/user/reg",
        newUser
      );
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Registration Successful",
          text: "Congratulations! You have been successfully registered into Giraffine Academy!",
          footer: "Please check your email for verification code",
        });
        // alert(
        //   "Registration Successful! Please check your email for verification."
        // );
        navigate("/otpVerification", { state: { email } });
      }
    } catch (error) {
      alert(error.response.data);
    }
  };

  const handlePasswordChange = (value) => {
    setPass(value);
    setPasswordsMatch(value === confPass);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfPass(value);
    setPasswordsMatch(pass === value);
    setConfirmTouched(true); // Set confirmTouched to true when the user starts typing in the confirm password field
  };

  return (
    <div className="register">
      {/* <Lottie className="reg_anime" animationData={animationData}/> */}
      <form className="reg_form" onSubmit={handleSubmit}>
        <h2>Sign Up</h2>
        <div>
          <label>First Name</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
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
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm pass">Confirm Password</label>
          <input
            type="password"
            id="confirm password"
            value={confPass}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            required
          />
        </div>
        {confirmTouched && !passwordsMatch && (
          <p className="error_text">Passwords do not match!</p>
        )}

        <button className="button" type="submit" disabled={!passwordsMatch}>
          Register
        </button>
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

export default Register;
