import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/LoginPage.css";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();


  const handleLogin = async (e) => {
    e.preventDefault();
    if (password.length < 6) {
        alert("Password must be at least 6 characters long");
        return;
      }
      console.log("Logging in with", email, password);
      navigate("/HomePage");

      try {
        const response = await fetch("http://localhost:5000/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          alert("Login successful!");
          localStorage.setItem("token", data.token); 
          navigate("/HomePage");
        } else {
          setError(data.message || "Login failed");
          alert(`Login failed: ${data.message}`);
        }
      } catch (error) {
        console.error("Error logging in:", error);
        setError("Login failed. Please try again.");
      }
    };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
     
        <button type="submit">Login</button>
      </form>
      <p>
        <Link to="/forgot-password">Forgot Password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default LoginPage;