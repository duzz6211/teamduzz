import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { withBase } from '../utils/asset'
import './NavBar.css'

const NavBar = () => {
  return (
    <nav className="navbar">
      <div className="navbar-container container">
        <Link to="/" className="navbar-logo" aria-label="TeamDuzz">
          <img className="logo-image" src={withBase('images/DUZZ_logo.png')} alt="DUZZ" />
        </Link>
        <ul className="navbar-menu">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Main
            </NavLink>
          </li>
          <li>
            <NavLink to="/portfolio" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Portfolio
            </NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
              Contact
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default NavBar

