import React from 'react'
import './Register.css'
import {Link} from 'react-router-dom'

const Register = () => {
  return (
   <>
   <section className='registeration-section'>
      <div className="registration-container">
        <div className="register">
        <form action="#">
          <h2>Registration</h2>
          <div className="name">
          <label htmlFor="#">Name</label>
          <input type="text" placeholder='Enter Name'/>
          </div>
         <div className="name">
         <label htmlFor="#">Email</label>
          <input type="text" placeholder='Enter Email'/>
         </div>
         <div className="name">
         <label htmlFor="#">Password</label>
          <input type="password" placeholder='Enter Password'/>
         </div>
        </form>
        </div>
        <div className="buttons">
          <Link type="Submit">Registration</Link>
          <div className="login-buttons">
          <p>Already have an account?</p><Link to="/Login" type="Submit">Login</Link>
        </div>
        </div>
      </div>
   </section>
   </>
  )
}

export default Register