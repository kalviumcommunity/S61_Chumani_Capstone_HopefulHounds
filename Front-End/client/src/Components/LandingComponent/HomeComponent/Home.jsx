import React from "react";
import './Home.css'
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="window">
      <div>
        <h1>HOPEFUL HOUNDS: BUILD A BETTER TOMORROW</h1>
      </div>
      <div className="box-container">
      <div className="box-1">
        <Link to='/hospital'>
        <div className="option">Show nearby hospitals</div>
        </Link>
        <Link to='/donate'>
        <div className="option">Donate amount</div>
        </Link>
      </div>
      <div className="box-2">
        <div>"You can't buy love, but you can rescue it".  "Money can buy a fine dog, but only love can make him wag his tail".  "Do not pity a shelter dog.  Adopt one."</div>
        <Link to='/adopt'>
        <div className="option">Adopt</div>
        </Link>
      </div>
      </div>
    </div>
  );
}
