import React from "react";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import logo from "../../assets/footer_logo.png";
import playstore from "../../assets/playstore.png";
import appstore from "../../assets/appstore.png";

export default function Footer() {
  return (
    <footer
      className="text-white font-nunito px-6 pt-16 pb-8"
      style={{ backgroundColor: "#183883" }}
    >
      {/* Top Section */}
      <div className="max-w-7xl mx-auto text-center">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Column 1: Logo + Map */}
          <div className="flex flex-col items-center">
            <img src={logo} alt="Logo" className="w-32 mb-4" />
            <iframe
              title="Google Map"
              src="https://maps.google.com/maps?q=TVS%20Motors&t=&z=13&ie=UTF8&iwloc=&output=embed"
              className="w-full h-32 rounded-md"
              loading="lazy"
            ></iframe>
          </div>

          {/* The rest 4 columns */}
          <div className="lg:col-span-4 grid grid-cols-2 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Quick Links */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-lg mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>
                  <a href="#">Home</a>
                </li>
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Products</a>
                </li>
                <li>
                  <a href="#">Contact</a>
                </li>
              </ul>
            </div>

            {/* Services */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-lg mb-4">Services</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>
                  <a href="#">Bike Repairs</a>
                </li>
                <li>
                  <a href="#">Insurance</a>
                </li>
                <li>
                  <a href="#">Booking</a>
                </li>
                <li>
                  <a href="#">Support</a>
                </li>
              </ul>
            </div>

            {/* Company */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-lg mb-4">Company</h4>
              <ul className="space-y-2 text-sm text-gray-200">
                <li>
                  <a href="#">Careers</a>
                </li>
                <li>
                  <a href="#">Blog</a>
                </li>
                <li>
                  <a href="#">Partners</a>
                </li>
                <li>
                  <a href="#">FAQs</a>
                </li>
              </ul>
            </div>

            {/* TVS Connect App */}
            <div className="flex flex-col items-center">
              <h4 className="font-semibold text-lg mb-4">TVS CONNECT APP</h4>
              <div className="flex flex-col gap-4 items-center">
                <a href="#">
                  <img src={playstore} alt="Play Store" className="w-32" />
                </a>
                <a href="#">
                  <img src={appstore} alt="App Store" className="w-32" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Divider */}
      <hr className="border-t border-white opacity-20 my-8" />

      {/* Bottom Section */}
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center text-sm gap-4 text-gray-200 text-center">
        {/* Social Media Icons */}
        <div className="flex gap-4 justify-center">
          <a href="#" className="hover:text-white">
            <FaFacebookF />
          </a>
          <a href="#" className="hover:text-white">
            <FaTwitter />
          </a>
          <a href="#" className="hover:text-white">
            <FaInstagram />
          </a>
          <a href="#" className="hover:text-white">
            <FaLinkedinIn />
          </a>
        </div>

        {/* Copyright */}
        <div>
          &copy; {new Date().getFullYear()} TVS Motors. All rights reserved.
        </div>

        {/* Legal Links */}
        <div className="flex flex-wrap gap-4 justify-center">
          <a href="#" className="hover:text-white">
            Terms & Conditions
          </a>
          <a href="#" className="hover:text-white">
            Privacy Policy
          </a>
          <a href="#" className="hover:text-white">
            Cookies Policy
          </a>
        </div>
      </div>
    </footer>
  );
}
