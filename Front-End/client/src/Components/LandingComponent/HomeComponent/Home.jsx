import React from "react";
import './Home.css'
import { Link } from "react-router-dom";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";

export default function Home() {
  return (
    <NavbarFooter>
    <div className="window">
      <div className="title">
        <h1>HOPEFUL HOUNDS: BUILD A BETTER TOMORROW</h1>
      </div>
      <div className="box-container">
      <div className="box-1">
        <Link to='/hospital'>
        <div className="option"><h2>Show nearby hospitals</h2></div>
        </Link>
        <Link to='/donate'>
        <div className="option"><h2>Donate amount</h2></div>
        </Link>
      </div>
      <div className="box-2">
        <div><h2>"You can't buy love, but you can rescue it".  "Money can buy a fine dog, but only love can make him wag his tail".  "Do not pity a shelter dog.  Adopt one."</h2></div>
        <Link to='/adopt'>
        <div className="adopt-btn">Adopt</div>
        </Link>
      </div>
      </div>
    </div>
    </NavbarFooter>
  );
}
