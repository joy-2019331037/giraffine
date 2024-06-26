import React, { useRef, useState, useEffect } from "react";
import axios from "axios";
import { Swal } from "sweetalert2";
import "./../styles/register.css";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [confPass, setConfPass] = useState("");
  const [passwordsMatch, setPasswordsMatch] = useState(false);
  // const isMounted = useRef(true);

  // useEffect(() => {
  //   return () => {
  //     // Clean up on unmount
  //     isMounted.current = false;
  //   };
  // }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      email: email,
      password: pass,
      rank: "pawn",
      isVerified: "", // Remove this if not needed
      friends: [], // Remove this if not needed
    };

    console.log("User:", newUser);

    try {
      const response = await axios.post(
        "http://localhost:8080/user/reg",
        newUser
      );

      // Check if component is still mounted before using Swal
      if (response.status === 201) {
        console.log("Registration successful:", response.data);
        //console.log(response.status);
        alert(
          "Registration Successful! Please check your email for verification."
        );
        navigate("/otpVerification", { state: { email } });
      } else {
        alert("Registration Failed");
      }
    } catch (error) {
      //console.error("Registration error:", error);
    }
  };

  const handlePasswordChange = (value) => {
    setPass(value);
    setPasswordsMatch(value === confPass);
  };

  const handleConfirmPasswordChange = (value) => {
    setConfPass(value);
    setPasswordsMatch(pass === value);
  };

  return (
    <div className="main">
      <form className="form" onSubmit={handleSubmit}>
        <h2>Register</h2>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email Address:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="pass">Password:</label>
          <input
            type="password"
            id="password"
            value={pass}
            onChange={(e) => handlePasswordChange(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="confirm pass">Confirm Password:</label>
          <input
            type="password"
            id="confirm password"
            value={confPass}
            onChange={(e) => handleConfirmPasswordChange(e.target.value)}
            required
          />
          {!passwordsMatch && (
            <p className="error-text">Passwords do not match!</p>
          )}
        </div>

        <button type="submit" disabled={!passwordsMatch}>
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;
