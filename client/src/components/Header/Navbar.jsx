import React from 'react'
import { Link } from 'react-router-dom'
import './Navbar.css'
const Navbar = () => {
  return (
   <>
   <nav className='navbar'>
       <h2>Lav Kushwaha</h2>
      <div className="links">
           <ul>
            <li><Link className="link" to="/">Home</Link></li>
            <li><Link className="link" to="/About">About</Link></li>
            <li><Link className="link" to="/Contact">Contact</Link></li>
            <li><Link className="link" to="/Login">Login</Link></li>
            <li><Link className="link" to="/Signup">Signup</Link></li>
          </ul> 
      </div>
   </nav>
   </>
  )
}

export default Navbar