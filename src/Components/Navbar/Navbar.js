import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Logo from '../Assets/Images/logo.png'
import "./Navbar.css";

function Navbar() {

  const [click, setClick] = useState(false)


  const navActive = ()=>setClick(!click)
  return (
    <div className="navbar-container ">
      <div className="navbar-content bd-container">
        <div className="logo">
          <Link to="/"><img src={Logo} alt="logo"></img></Link>
        </div>

        
        <div
          className={click ? "menu-toggle active" : "menu-toggle"}
          onClick={navActive}
        >
          <div className="bar1"></div>
          <div className="bar2"></div>
          <div className="bar3"></div>
        </div>

        <div className="nav-menu-list">
          <li className="nav-list">
            <Link to="/">Home</Link>
          </li>
          <li className="nav-list">
            <Link to="/create-blog-post">Create Blog</Link>
          </li>

          <li className="nav-list">
            <Link to="/profile">Profile</Link>
          </li>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
