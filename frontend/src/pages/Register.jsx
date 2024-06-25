import React, { useState } from "react";
import axios from "axios";

import "./../styles/register.css";

const Register = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newUser = {
      firstName: firstName,
      lastName: lastName,
      rank: "pawn",
      friends: [],
    };

    console.log("First Name:", firstName);
    console.log("Last Name:", lastName);
    console.log("User:", newUser);

    await axios.post("http://localhost:8080/user/reg", newUser);
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
            id="email"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
