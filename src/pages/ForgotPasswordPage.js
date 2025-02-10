import React, { useState } from "react";
import "../styles/ForgotPasswordPage.css";
import { forgotPassword } from "../api/auth";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      console.log("Sending reset password request for:", email);
      const response = await forgotPassword(email);
      console.log("Server Response:", response);

      setMessage(response.message || "Check your email for reset instructions.");
    } catch (error) {
      console.error("Error in Forgot Password:", error);
      setMessage(error.message || "Something went wrong. Try again.");
    } 
  };

  return (
    <div className="forgot-password-container">
      <h2>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <button type="submit">Reset Password</button>
      </form>
    </div>
  );
}

export default ForgotPasswordPage;