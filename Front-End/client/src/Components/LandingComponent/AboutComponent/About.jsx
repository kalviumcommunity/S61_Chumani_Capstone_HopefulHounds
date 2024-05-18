import React from "react";
import './About.css'
import NavbarFooter from "../NavbarFooterComponent/NavbarFooter";
import Footer from "../NavbarFooterComponent/Footer";

export default function About() {
  return (
    <div>
      <NavbarFooter />
    <div className="about">
      <h1>ABOUT US</h1>
      <h2>Welcome to our Dog Adoption and Care Website!</h2>
      <p>
        At Hopeful Hounds, we are passionate about connecting loving homes with
        furry companions in need. Our platform serves as a bridge between
        adoptable dogs and caring individuals or families, aiming to create
        lifelong bonds filled with joy and companionship.
      </p>
      <h2>Our Mission</h2>
      <p>
        <ul>
          <li>
            Facilitate the adoption process by providing a user-friendly
            platform where potential adopters can browse through profiles of
            dogs in need of homes.
          </li>
          <li>
            Educate the community about responsible pet ownership including
            proper care, training, and the importance of spaying/neutering.
          </li>
          <li>
            Support local animal shelters and rescue organizations by promoting
            adoption, fostering, and volunteer opportunities.
          </li>
        </ul>
      </p>
      <h2>Our Commitment to Excellence:</h2>
      <p>
        <ul>
          <li>
            <b>
              Transparency: We strive to privide accurate and up-to-date
              information about our adoptable dogs and our organization's
              activities.
            </b>
          </li>
          <b>Accountability:</b>
          <li>
            We hold ourselves accountable for the well-being of the dogs in our
            care and are committed to finding them loving forever homes.
          </li>
          <li>
            <b>Accessibility</b>
            <li>
              Our website is designed to be user-friendly, accessible to all,
              and inclusive of diverse communities.
            </li>
          </li>
        </ul>
      </p>
    </div>
    <Footer />
    </div>
  );
}
