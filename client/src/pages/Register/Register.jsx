import React, { useState } from 'react';
import './Register.css';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3001/signup', { name, email, password });
      alert('Account created successfully');
    } catch (error) {
      console.error('Registration error:', error);
    }
  };

  return (
    <>
      <section className='registration-section'>
        <div className="registration-container">
          <div className="register">
            <form onSubmit={handleSubmit}>
              <h2>Registration</h2>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  required
                  type="text"
                  name="name"
                  placeholder='Enter Name'
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  required
                  type="text"
                  name="email"
                  placeholder='Enter Email'
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  required
                  type="password"
                  name="password"
                  placeholder='Enter Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="buttons">
                <button type="submit">Registration</button>
              </div>
            </form>
            <div className="login-buttons">
              <p>Already have an account?</p>
              <Link to="/Login">Login</Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Register;
