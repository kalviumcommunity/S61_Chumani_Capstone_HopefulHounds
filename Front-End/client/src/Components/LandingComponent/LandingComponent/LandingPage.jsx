import React from "react";
import logo from "../../../assets/Capstone-1/logo.png";
import image3 from "../../../assets/Capstone-1/image-3.jpeg";
import image4 from "../../../assets/Capstone-1/image-4.webp";
import image5 from "../../../assets/Capstone-1/image-5.jpg";
import image6 from "../../../assets/Capstone-1/image-6.jpg";
import image7 from "../../../assets/Capstone-1/image-7.webp";
import youtube from "../../../assets/Capstone-1/youtube (2).png"
import whatsapp from "../../../assets/Capstone-1/whatsapp.png"
import twitter from "../../../assets/Capstone-1/twitter (1).png"
import instagram from "../../../assets/Capstone-1/instagram (1).png"
import facebook from "../../../assets/Capstone-1/facebook (1).png"
import "./LandingPage.css";
import { Link } from "react-router-dom";
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import { useDonation } from "../DonateComponent/DonationContext";
import Footer from "../NavbarFooterComponent/Footer";

function LandingPage() {
  const {totalDonation} = useDonation();
  return (
    <div>
    <NavbarFooter />
    <div className="landingPageContainer">
        {/* <NavbarFooter /> */}
      <div className="body">
        <div className="motto">
          <h2>
            A person who has never owned a dog has missed a wonderful part of
            life.
          </h2>
          <div className="start-btn">
            <Link to="/home">
              <h2>Get Started</h2>
            </Link>
          </div>
        </div>
      </div>
      <div className="quote">
        <h1>
          Embrace a world of joy <br />
          with our platform dedicated <br />
          to celebrating pets
        </h1>
      </div>
      <div className="donation-summary">
        <marquee behavior="scroll" direction="right"><h2>Total Donation Amount : ${totalDonation.toFixed(2)}</h2></marquee>
      </div>
      <div className="sample-img-container">
        <div className="sample-img">
          <img src={image3} alt="" />
        </div>
        <div className="sample-img">
          <img src={image4} alt="" />
        </div>
        <div className="sample-img">
          <img src={image5} alt="" />
        </div>
        <div className="sample-img">
          <img src={image6} alt="" />
        </div>
        <div className="sample-img">
          <img src={image7} alt="" />
        </div>
      </div>

    </div>
    <Footer />
    </div>
  );
}

export default LandingPage;
