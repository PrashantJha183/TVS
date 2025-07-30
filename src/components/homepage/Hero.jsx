import React, { useState, useEffect, useRef } from "react";
import img1 from "../../assets/hero_banner.png";
import img2 from "../../assets/hero_banner.png";
import img3 from "../../assets/hero_banner.png";
import img4 from "../../assets/hero_banner.png";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
const images = [img1, img2, img3, img4];

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef(null);
  const touchStartXRef = useRef(0);
  const touchEndXRef = useRef(0);

  const resetTimeout = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
  };

  useEffect(() => {
    resetTimeout();
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 5000);
    return () => resetTimeout();
  }, [currentIndex]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleTouchStart = (e) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const distance = touchStartXRef.current - touchEndXRef.current;
    if (distance > 50) nextSlide();
    else if (distance < -50) prevSlide();
  };

  return (
    <section
      className="relative w-full h-[30vh] sm:h-[60vh] lg:h-[70vh] overflow-hidden select-none"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Slides container */}
      <div
        className="flex transition-transform duration-700 ease-in-out h-full"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{ flex: "0 0 100%" }}
          >
            <img
              src={img}
              alt={`Slide ${index + 1}`}
              className="hero-image object-cover"
            />
          </div>
        ))}
      </div>

      {/* Navigation Buttons */}
      <button
        onClick={prevSlide}
        className="hidden sm:flex items-center justify-center absolute top-1/2 left-0 -translate-y-1/2 z-10 transition-all duration-300 hover:scale-105 hover:shadow-xl semi-button"
        style={{
          backgroundColor: "#000000cc",
          width: "60px",
          height: "120px",
          borderTopRightRadius: "60px",
          borderBottomRightRadius: "60px",
          fontSize: "40px",
          color: "#fff",
        }}
        aria-label="Previous Slide"
      >
        <AiOutlineLeft />
      </button>

      <button
        onClick={nextSlide}
        className="hidden sm:flex items-center justify-center absolute top-1/2 right-0 -translate-y-1/2 z-10 text-white shadow-md semi-button"
        style={{
          backgroundColor: "#000000cc",
          color: "#fff",
          width: "60px",
          height: "120px",
          borderTopLeftRadius: "60px",
          borderBottomLeftRadius: "60px",
          fontSize: "40px",
        }}
        aria-label="Next Slide"
      >
        <AiOutlineRight />
      </button>

      {/* Dot Indicators */}
      <div className="absolute bottom-6 inset-x-0 flex justify-center gap-2 z-10 w-full">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-3 w-3 rounded-full ${
              index === currentIndex ? "bg-red-600" : "bg-gray-300"
            } transition-colors`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Red Loader Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-gray-200 overflow-hidden">
        <div
          key={currentIndex}
          className="h-full bg-red-600 animate-loader"
        ></div>
      </div>
    </section>
  );
};

export default Hero;
