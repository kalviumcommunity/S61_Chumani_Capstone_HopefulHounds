import React from 'react';
import youtube from "../../../assets/Capstone-1/youtube (2).png";
import whatsapp from "../../../assets/Capstone-1/whatsapp.png";
import twitter from "../../../assets/Capstone-1/twitter (1).png";
import instagram from "../../../assets/Capstone-1/instagram (1).png";
import facebook from "../../../assets/Capstone-1/facebook (1).png";
import LandingPage from '../LandingComponent/LandingPage';
function Footer() {
  return (
      <div className="footer">
        <div className="follow">
          <p>Follow us</p>
        </div>
        <div className="social-media-logo-container">
          <div className="social-media-logo">
            <img src={youtube} alt="" />
          </div>
          <div className="social-media-logo">
            <img src={instagram} alt="" />
          </div>
          <div className="social-media-logo">
            <img src={facebook} alt="" />
          </div>
          <div className="social-media-logo">
            <img src={whatsapp} alt="" />
          </div>
          <div className="social-media-logo">
            <img src={twitter} alt="" />
          </div>
        </div>
      </div>

  );
}

export default Footer;
