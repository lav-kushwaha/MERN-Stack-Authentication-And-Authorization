import React, { useState } from 'react';
import './Login.css';
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios';

const Login = () => {
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/login', { email, password });
      const { status, role } = response.data;

      console.log("login:", response.data);

      if (status === "Success") {
        if (role === "admin") {
          navigate('/dashboard');
        } else {
          navigate('/');
        }
        alert("Login Successful");
      } else {
        alert("Login Failed");
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert("Login Failed. Please try again.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Login</h3>
        <form onSubmit={handleSubmit}>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter Password" onChange={(e)=>setPassword(e.target.value)} required/>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
      </div>
    </div>
  );
};
export default Login;
