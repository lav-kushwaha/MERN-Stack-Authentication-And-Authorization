// Login.js
import React, { useState } from 'react';
import './Login.css';
import {Link} from 'react-router-dom'

const Login = () => {
  return (
    <div className="login-container">
      <div className="login-form">
        <h3>Login</h3>
        <form>
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email"placeholder="Email"/>
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Password"/>
          <button type="submit">Login</button>
        </form>
        <p>Don't have an account? <Link to="/Signup">Sign Up</Link></p>
      </div>
    </div>
  );
};
export default Login;
