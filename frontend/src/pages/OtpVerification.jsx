import React, { useState, useEffect } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useLocation, useNavigate } from "react-router-dom";
import "./../styles/otpVerification.css";

const OtpVerification = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (location.state && location.state.email) {
      setEmail(location.state.email);
    } else {
      navigate("/");
    }
  }, [location, navigate]);

  const handleChange = (element, index) => {
    if (isNaN(element.value)) return false;

    setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

    // Focus on next input
    if (element.nextSibling) {
      element.nextSibling.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const otpCode = otp.join("");
      const OTP = otpCode.toString();
      console.log(email.toString());
      console.log(otpCode);
      const response = await axios.post(
        `http://localhost:8080/user/verify-otp?email=${email}&otp=${OTP}`
      );

      if (response.status === 200) {
        alert("Your email has been verified successfully.");
        navigate("/"); // Redirect to home or login page after successful verification
      } else {
        Swal.fire({
          icon: "error",
          title: "Verification Failed",
          text: "Invalid OTP. Please try again.",
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Verification Failed",
        text: "An error occurred. Please try again later.",
      });
    }
  };

  return (
    <div className="otp">
      <form className="otp_form" onSubmit={handleSubmit}>
        <h2>OTP Verification</h2>
        <div className="otp-inputs">
          {otp.map((data, index) => {
            return (
              <input
                key={index}
                type="text"
                name="otp"
                maxLength="1"
                value={data}
                onChange={(e) => handleChange(e.target, index)}
                onFocus={(e) => e.target.select()}
              />
            );
          })}
        </div>
        <button type="submit">Verify</button>
      </form>
    </div>
  );
};

export default OtpVerification;
