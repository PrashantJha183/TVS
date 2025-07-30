import React, { useState } from "react";
import tvsLogo from "../../assets/tvs_logo.png";
import { MdDirectionsBike, MdTranslate } from "react-icons/md";
import { FaVials } from "react-icons/fa"; // Lab vials/test tubes

export const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <header className="w-full px-6 py-4 shadow-md bg-white fixed top-0 z-50 font-nunito text-sm text-pureBlack">
      <div className="max-w-screen-2xl mx-auto flex justify-between items-center">
        {/* Left Side */}
        <div className="flex items-center space-x-6">
          <img src={tvsLogo} alt="Logo" className="h-6 w-auto max-w-[120px]" />

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 font-medium">
            <a href="#">Home</a>
            <a href="#">Product</a>
            <a href="#">Service</a>
            <a href="#">Shop</a>
            <a href="#">Social Timeline</a>
            <a href="#">Nearby Dealers</a>
            <a href="#">Contact Us</a>
          </nav>
        </div>

        {/* Right Side */}
        <div className="hidden md:flex items-center space-x-6 font-medium">
          <a href="#" className="text-brandBlue font-bold">
            Buy Vehicle
          </a>
          <div className="flex items-center space-x-3 text-sm">
            <span className="text-gray-400">|</span>
            <a href="#" className="text-brandBlue font-bold">
              Test Ride
            </a>
            <span className="text-gray-400">|</span>
            <a href="#">Language</a>
          </div>
        </div>

        {/* Hamburger Icon */}
        <div className="md:hidden z-50">
          <button
            className="w-8 h-6 flex flex-col justify-between items-center relative group"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            <span
              className={`block w-full h-1 bg-pureBlack transition-all duration-300 ease-in-out transform ${
                menuOpen ? "rotate-45 translate-y-2" : ""
              }`}
            ></span>
            <span
              className={`block w-full h-1 bg-pureBlack transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`block w-full h-1 bg-pureBlack transition-all duration-300 ease-in-out transform ${
                menuOpen ? "-rotate-45 -translate-y-2" : ""
              }`}
            ></span>
          </button>
        </div>
      </div>

      {/* Mobile Slide-In Menu */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-500 ease-in-out z-40 ${
          menuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-6 flex flex-col space-y-4 font-medium pt-14">
          <a href="#" onClick={toggleMenu}>
            Home
          </a>
          <a href="#" onClick={toggleMenu}>
            Product
          </a>
          <a href="#" onClick={toggleMenu}>
            Shops
          </a>
          <a href="#" onClick={toggleMenu}>
            Service
          </a>
          <a href="#" onClick={toggleMenu}>
            Social Timeline
          </a>
          <a href="#" onClick={toggleMenu}>
            Nearby Dealers
          </a>
          <a href="#" onClick={toggleMenu}>
            Contact Us
          </a>
        </div>
      </div>

      {/* Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-40 z-30"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Mobile Bottom Bar */}
      <div className="fixed bottom-0 left-0 w-full bg-white border-t border-gray-300 flex justify-around items-center py-2 md:hidden z-50 shadow-inner">
        <a
          href="#"
          className="flex flex-col items-center text-brandBlue font-semibold text-xs"
        >
          <MdDirectionsBike size={22} />
          Buy
        </a>
        <span className="h-6 w-px bg-gray-300" />
        <a
          href="#"
          className="flex flex-col items-center text-brandBlue font-semibold text-xs"
        >
          <FaVials size={22} />
          Test Ride
        </a>
        <span className="h-6 w-px bg-gray-300" />
        <a
          href="#"
          className="flex flex-col items-center text-black font-semibold text-xs"
        >
          <MdTranslate size={22} />
          Lang
        </a>
      </div>
    </header>
  );
};
