import React, { useState, useEffect } from "react";
import axios from "axios";
import { Button } from "@chakra-ui/react";
import Swal from "sweetalert2";
import CircularProgress from "@mui/material/CircularProgress";

const Settings = ({ userId }) => {
  // Local state to store form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  });
  const [User, setUser] = useState(null);

  const fetchUser = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/user/getUserById/${userId}`
      );

      setUser(response.data);
    } catch (error) {
      console.error("Failed to fetch personal submissions : ", error);
    }
  };

  useEffect(() => {
    fetchUser();
  }, [userId]);

  const [errorMessage, setErrorMessage] = useState("");

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);

    // Check if password and confirmPassword match
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Clear error message
    setErrorMessage("");

    try {
      // Send the update request to the backend
      const response = await axios.put(
        `http://localhost:8080/user/update/${userId}`,
        {
          firstName: formData.firstName,
          lastName: formData.lastName,
          password: formData.password,
        }
      );
      Swal.fire({
        position: "center",
        icon: "success",
        title: `${response.data}`,
        showConfirmButton: true,
      });
      console.log(response.data);
      // Handle successful update

      setFormData({
        firstName: "",
        lastName: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // Handle error
      setErrorMessage("An error occurred while updating the user");
    }
  };

  if (!User) {
    return (
      <center>
        <CircularProgress color="inherit" />
      </center>
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "0rem 0rem 1rem 5rem",
      }}
    >
      <label
        style={{ marginBottom: "2rem", fontSize: "1.1rem", color: "green" }}
      >
        Update Profile Info
      </label>

      <form
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
          padding: "0rem 5rem 1rem 5rem",
        }}
      >
        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "600" }}>First Name</label>
          <input
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1px 5px 1px 5px",
              margin: "0.5rem 0rem 0rem 2rem",
            }}
            type="text"
            id="firstName"
            name="firstName"
            placeholder={User.firstName}
            value={formData.firstName}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "600" }}>Last Name</label>
          <input
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1px 5px 1px 5px",
              margin: "0.5rem 0rem 0rem 2rem",
            }}
            type="text"
            id="lastName"
            name="lastName"
            placeholder={User.lastName}
            value={formData.lastName}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "600" }}>Current Password</label>
          <input
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1px 5px 1px 5px",
              margin: "0.5rem 0rem 0rem 2rem",
              backgroundColor: "#f0f0f0",
            }}
            type="password"
            id="password"
            name="password"
            placeholder={User.password}
            disabled
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "600" }}>New Password</label>
          <input
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1px 5px 1px 5px",
              margin: "0.5rem 0rem 0rem 2rem",
            }}
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <label style={{ fontWeight: "600" }}>Confirm Password</label>
          <input
            style={{
              border: "1px solid #ccc",
              borderRadius: "5px",
              padding: "1px 5px 1px 5px",
              margin: "0.5rem 0rem 0rem 2rem",
            }}
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
        </div>
        {errorMessage && (
          <p style={{ textAlign: "center", color: "red" }}>{errorMessage}</p>
        )}
        <Button onClick={handleSubmit} type="submit">
          Update
        </Button>
      </form>
    </div>
  );
};

export default Settings;
