import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";

const reviews = [
  {
    name: "Amit Sharma",
    rating: 5,
    text: "Amazing service and top-quality products. Highly recommend to everyone!",
  },
  {
    name: "Sneha Patel",
    rating: 4,
    text: "Very professional team. They listened carefully and delivered beyond expectations.",
  },
  {
    name: "Rahul Verma",
    rating: 5,
    text: "Exceptional quality and timely delivery. I'm really impressed!",
  },
  {
    name: "Priya Nair",
    rating: 4,
    text: "Smooth experience. Customer support was helpful throughout.",
  },
  {
    name: "Mohit Jain",
    rating: 5,
    text: "Affordable and reliable. One of the best experiences I've had.",
  },
];

const Review = () => {
  const [current, setCurrent] = useState(0);
  const [currentCards, setCurrentCards] = useState([]);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [direction, setDirection] = useState("right");
  const swipeContainer = useRef(null);
  const touchStartX = useRef(0);

  const cardPerPage = isMobile ? 1 : 3;

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const nextCards = reviews
      .slice(current, current + cardPerPage)
      .concat(
        reviews.slice(0, Math.max(0, current + cardPerPage - reviews.length))
      );
    setCurrentCards(nextCards);
  }, [current, cardPerPage]);

  const next = () => {
    setDirection("right");
    setCurrent((prev) => (prev + cardPerPage) % reviews.length);
  };

  const prev = () => {
    setDirection("left");
    setCurrent(
      (prev) => (prev - cardPerPage + reviews.length) % reviews.length
    );
  };

  useEffect(() => {
    if (isMobile && swipeContainer.current) {
      const node = swipeContainer.current;

      const handleTouchStart = (e) => {
        touchStartX.current = e.touches[0].clientX;
      };

      const handleTouchEnd = (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        const diff = touchStartX.current - touchEndX;

        if (diff > 50) {
          next();
        } else if (diff < -50) {
          prev();
        }
      };

      node.addEventListener("touchstart", handleTouchStart);
      node.addEventListener("touchend", handleTouchEnd);

      return () => {
        node.removeEventListener("touchstart", handleTouchStart);
        node.removeEventListener("touchend", handleTouchEnd);
      };
    }
  }, [isMobile]);

  return (
    <div
      className="py-16 px-6 font-nunito overflow-x-auto scrollbar-hide"
      id="reviews"
    >
      {/* Heading */}
      <motion.div
        className="max-w-7xl mx-auto mb-8 overflow-x-auto scrollbar-hide whitespace-nowrap"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <div className="flex flex-col md:flex-row justify-between items-center">
          <h2 className="text-3xl font-bold text-center md:text-left mb-4 md:mb-0 text-black">
            Real People, Real Reviews
          </h2>

          {!isMobile && (
            <div className="flex gap-4">
              <button
                onClick={prev}
                className="p-3 bg-white text-black rounded-full border border-black hover:bg-gray-800 hover:text-white transition text-3xl"
                aria-label="Previous reviews"
              >
                <AiOutlineLeft />
              </button>

              <button
                onClick={next}
                className="p-3 bg-white text-black rounded-full border border-black hover:bg-gray-800 hover:text-white transition text-3xl"
                aria-label="Next reviews"
              >
                <AiOutlineRight />
              </button>
            </div>
          )}
        </div>

        <h3 className="text-xl font-semibold text-[#333] mt-2 text-left">
          What Our Clients Say
        </h3>
      </motion.div>

      {/* Review Cards */}
      <motion.div
        ref={swipeContainer}
        className={`relative grid ${
          isMobile ? "grid-cols-1" : "grid-cols-3"
        } gap-6 max-w-7xl mx-auto min-h-[250px]`}
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false, amount: 0.2 }}
      >
        <AnimatePresence initial={false} mode="wait">
          {currentCards.map((review, idx) => (
            <motion.div
              key={`${review.name}-${current}-${idx}`}
              className="bg-white p-6 rounded-xl shadow-md h-full flex flex-col justify-between min-h-[200px]"
              initial={{ x: direction === "right" ? 100 : -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: direction === "right" ? -100 : 100, opacity: 0 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
            >
              <div className="mb-4">
                <div className="flex gap-1 mb-2 text-yellow-500">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <FaStar key={i} />
                  ))}
                </div>
                <p className="text-sm text-gray-600 italic">{`"${review.text}"`}</p>
              </div>
              <h4 className="text-base font-bold mt-4 text-[#1D3D85]">
                — {review.name}
              </h4>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* CTA Buttons */}
      <motion.div
        className="flex justify-center items-center gap-4 mt-10"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
        viewport={{ once: true }}
      >
        <button className="btn-view px-6 py-2 rounded-lg font-semibold border">
          View All Reviews
        </button>
        <button className="btn-submit px-6 py-2 rounded-lg font-semibold border">
          Submit Review
        </button>
      </motion.div>
    </div>
  );
};

export default Review;
