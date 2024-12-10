import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchUserByUsername } from "../services/api";

const Login = ({ setLoggedIn }) => {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const user = await fetchUserByUsername(formData.username);
      if (user.password === formData.password) {
        setLoggedIn(true);
        alert("Login successful!");
        navigate("/");
      } else {
        setError("Invalid username or password");
      }
    } catch (error) {
      setError("Error during login. Please try again.");
    }
  };

  return (
    <div className="auth-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
