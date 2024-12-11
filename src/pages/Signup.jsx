import React, { useState } from "react";
import { signupUser } from "../services/auctionService";

const Signup = () => {
  const [userDetails, setUserDetails] = useState({ username: "", password: "", email: "", role: "BUYER" });
  const [message, setMessage] = useState("");

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDetails({ ...userDetails, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signupUser(userDetails);
      setMessage("Signup successful!");
    } catch (error) {
      setMessage("Signup failed.");
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <input name="username" placeholder="Username" onChange={handleInputChange} required />
        <input name="password" type="password" placeholder="Password" onChange={handleInputChange} required />
        <input name="email" type="email" placeholder="Email" onChange={handleInputChange} required />
        <select name="role" onChange={handleInputChange}>
          <option value="BUYER">Buyer</option>
          <option value="SELLER">Seller</option>
        </select>
        <button type="submit">Signup</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default Signup;
