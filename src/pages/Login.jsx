import React, { useState } from "react";
import { loginUser } from "../services/auctionService";

const Login = ({ onLoginSuccess }) => {
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [error, setError] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (typeof onLoginSuccess !== "function") {
      console.error("onLoginSuccess prop is not a function or is missing!");
      return;
    }
    try {
      const user = await loginUser(credentials);
      console.log("Login Successful:", user);
      onLoginSuccess(user);
    } catch (err) {
      setError("Login failed. Please check your credentials.");
      console.error("Login Error:", err);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          name="username"
          placeholder="Username"
          onChange={handleInputChange}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          onChange={handleInputChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
};

export default Login;
