import React from "react";
import logo from "../../../assets/Capstone-1/logo.png";
import "./LandingPage.css";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <div>
    <div className="main">
      <div className="logo-container">
        <img src={logo} alt="" id="logo" />
        <h1>Hopeful Hounds</h1>
      </div>
      <div className="nav-options">
        <Link to='/shop'><h2>Shop</h2></Link>
          
          <Link to='/about'><h2>About</h2></Link>
          
        </div>
    </div>
    <div className="body">
      <div className="motto">
        <h2>
        A person who has never owned a dog has missed a wonderful part of life.
        </h2>
        <div className="start-btn">
          <Link to='/home'>
          <h2>Get Started</h2>
          </Link>
        </div>
      </div>
    </div>
    </div>
  );
}

export default LandingPage;
