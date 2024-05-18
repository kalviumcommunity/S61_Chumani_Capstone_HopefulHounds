import React from "react";
import { Link } from "react-router-dom";
import "./NavbarFooter.css";
import logo from "../../../assets/Capstone-1/logo.png";

import Footer from "./Footer";

function NavbarFooter({children}) {
  return (
    <div>
      <div className="main">
        
        <div className="logo-container">
        <Link to='/'>
          <img src={logo} alt="" id="logo" />
          </Link>
          <Link to='/'>
          <h1>Hopeful Hounds</h1>
          </Link>
        </div>
        
        <div className="nav-options">
          <Link to="/shop">
            <h2>Shop</h2>
          </Link>

          <Link to="/about">
            <h2>About</h2>
          </Link>
        </div>
      </div>
      <div className="children">{children}</div>
     
    </div>
  );
}

export default NavbarFooter;
