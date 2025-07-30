import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useAnimation } from "framer-motion";
import { AiOutlineLeft, AiOutlineRight } from "react-icons/ai";
import { useInView } from "react-intersection-observer";
import bikeImage from "../../assets/image 3.png";

const bikesData = {
  Motorcycles: [
    {
      image: bikeImage,
      model: "X-Pulse 200",
      engine: "199 cc",
      power: "18.4 hp",
      weight: "153 kg",
      price: "₹1,45,000",
    },
    {
      image: bikeImage,
      model: "Passion Pro",
      engine: "113 cc",
      power: "9 hp",
      weight: "117 kg",
      price: "₹85,000",
    },
    {
      image: bikeImage,
      model: "Glamour 125",
      engine: "124 cc",
      power: "10.5 hp",
      weight: "122 kg",
      price: "₹95,000",
    },
    {
      image: bikeImage,
      model: "Splendor+",
      engine: "97 cc",
      power: "8 hp",
      weight: "110 kg",
      price: "₹75,000",
    },
    {
      image: bikeImage,
      model: "Karizma XMR",
      engine: "210 cc",
      power: "25 hp",
      weight: "160 kg",
      price: "₹1,72,000",
    },
  ],
  Scooters: [
    {
      image: bikeImage,
      model: "Maestro Edge",
      engine: "110 cc",
      power: "8.1 hp",
      weight: "112 kg",
      price: "₹76,500",
    },
    {
      image: bikeImage,
      model: "Pleasure+",
      engine: "110 cc",
      power: "8 hp",
      weight: "104 kg",
      price: "₹70,000",
    },
    {
      image: bikeImage,
      model: "Destini 125",
      engine: "124 cc",
      power: "9 hp",
      weight: "111 kg",
      price: "₹82,000",
    },
    {
      image: bikeImage,
      model: "Duet",
      engine: "110 cc",
      power: "8 hp",
      weight: "113 kg",
      price: "₹74,000",
    },
  ],
  Mopeds: [
    {
      image: bikeImage,
      model: "TVS XL100",
      engine: "99.7 cc",
      power: "4.3 hp",
      weight: "89 kg",
      price: "₹45,000",
    },
    {
      image: bikeImage,
      model: "TVS Luna",
      engine: "100 cc",
      power: "5 hp",
      weight: "85 kg",
      price: "₹40,000",
    },
    {
      image: bikeImage,
      model: "Hero Puch",
      engine: "97 cc",
      power: "6 hp",
      weight: "90 kg",
      price: "₹42,000",
    },
  ],
  Electric: [
    {
      image: bikeImage,
      model: "Hero Electric Optima",
      engine: "BLDC",
      power: "1.2 kW",
      weight: "82 kg",
      price: "₹85,000",
    },
    {
      image: bikeImage,
      model: "Hero Electric NYX",
      engine: "BLDC",
      power: "1.3 kW",
      weight: "87 kg",
      price: "₹90,000",
    },
    {
      image: bikeImage,
      model: "Hero Electric AE-47",
      engine: "BLDC",
      power: "3.5 kW",
      weight: "120 kg",
      price: "₹1,25,000",
    },
    {
      image: bikeImage,
      model: "Hero Electric Dash",
      engine: "BLDC",
      power: "250 W",
      weight: "77 kg",
      price: "₹62,000",
    },
  ],
  "Three Wheelers": [
    {
      image: bikeImage,
      model: "Hero Electric Rickshaw",
      engine: "Electric",
      power: "1.5 kW",
      weight: "350 kg",
      price: "₹1,90,000",
    },
    {
      image: bikeImage,
      model: "Treo Yaari",
      engine: "Electric",
      power: "2 kW",
      weight: "370 kg",
      price: "₹2,10,000",
    },
    {
      image: bikeImage,
      model: "Piaggio Ape E-City",
      engine: "Electric",
      power: "3.5 kW",
      weight: "450 kg",
      price: "₹2,45,000",
    },
  ],
};

const categories = Object.keys(bikesData);

const Product = () => {
  const [activeCategory, setActiveCategory] = useState("Motorcycles");
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(0);
  const [cardsPerPage, setCardsPerPage] = useState(3);
  const touchStartX = useRef(0);
  const [transitionKey, setTransitionKey] = useState(Date.now());
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.2 });
  const controls = useAnimation();

  const bikes = bikesData[activeCategory] || [];

  useEffect(() => {
    const updateCardsPerPage = () => {
      setCardsPerPage(window.innerWidth < 768 ? 1 : 3);
    };
    updateCardsPerPage();
    window.addEventListener("resize", updateCardsPerPage);
    return () => window.removeEventListener("resize", updateCardsPerPage);
  }, []);

  useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0, transition: { duration: 0.6 } });
    } else {
      controls.set({ opacity: 0, y: 30 });
    }
  }, [inView, controls]);

  const next = () => {
    if (index + cardsPerPage < bikes.length) {
      setDirection(1);
      setIndex(index + cardsPerPage);
      setTransitionKey(Date.now());
    }
  };

  const prev = () => {
    if (index > 0) {
      setDirection(-1);
      setIndex(index - cardsPerPage);
      setTransitionKey(Date.now());
    }
  };

  const handleSwipe = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    if (deltaX > 50) prev();
    else if (deltaX < -50) next();
  };

  const visibleBikes = bikes.slice(index, index + cardsPerPage);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 30 }}
      className="w-full px-4 md:px-20 py-10 font-nunito overflow-x-auto scrollbar-hide whitespace-nowrap"
    >
      <div className="flex flex-col md:flex-row items-center justify-between mb-0">
        <h2 className="text-xl font-bold" style={{ color: "#757575" }}>
          DISCOVER YOUR RIDE
        </h2>
        <div className="gap-4 hidden md:flex">
          <button
            onClick={prev}
            disabled={index === 0}
            className="p-3 bg-white text-black rounded-full border border-black hover:bg-gray-800 hover:text-white transition text-3xl"
          >
            <AiOutlineLeft size={24} />
          </button>
          <button
            onClick={next}
            disabled={index + cardsPerPage >= bikes.length}
            className="p-3 bg-white text-black rounded-full border border-black hover:bg-gray-800 hover:text-white transition text-3xl"
          >
            <AiOutlineRight size={24} />
          </button>
        </div>
      </div>

      <div className="mb-10">
        <h3 className="text-4xl font-semibold mb-10 text-center md:text-left">
          Vehicle
        </h3>
        <div className="border-b border-gray-300 overflow-x-auto scrollbar-hide">
          <div className="flex gap-6 min-w-max md:min-w-full px-1 justify-center md:justify-start">
            {categories.map((cat) => (
              <motion.button
                key={cat}
                onClick={() => {
                  setActiveCategory(cat);
                  setIndex(0);
                  setDirection(0);
                  setTransitionKey(Date.now());
                }}
                whileTap={{ scale: 0.95 }}
                className={`relative px-4 py-3 text-base md:text-lg font-medium transition-all ${
                  activeCategory === cat
                    ? "text-black border-b-2 border-red-600"
                    : "text-gray-600 border-b-2 border-transparent"
                }`}
              >
                {cat}
              </motion.button>
            ))}
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={activeCategory + "-" + transitionKey}
          initial={
            direction === 0
              ? { opacity: 0 }
              : { opacity: 0, x: direction > 0 ? 80 : -80 }
          }
          animate={{ opacity: 1, x: 0 }}
          exit={
            direction === 0
              ? { opacity: 0 }
              : { opacity: 0, x: direction > 0 ? -80 : 80 }
          }
          transition={{ duration: 0.4 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
          onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
          onTouchEnd={handleSwipe}
        >
          {visibleBikes.map((bike, i) => (
            <motion.div
              key={i}
              className="rounded-xl p-4 shadow-md flex flex-col items-center text-center"
              style={{
                background:
                  "radial-gradient(circle at top left, rgba(255,255,255,0.15), rgba(0,0,0,0.05))",
                border: "1px solid rgba(255, 255, 255, 0.2)",
                backdropFilter: "blur(12px) saturate(180%)",
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
            >
              <img
                src={bike.image}
                alt={bike.model}
                className="w-full h-50 object-cover rounded"
              />
              <h4 className="text-xl font-bold mt-4">{bike.model}</h4>

              <div className="mt-3 flex justify-center items-center w-full text-gray-800 text-sm font-medium space-x-4">
                <div className="text-center px-2">
                  <p className="text-base mb-1" style={{ color: "#404040" }}>
                    Engine
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {bike.engine}
                  </p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center px-2">
                  <p className="text-base mb-1" style={{ color: "#404040" }}>
                    Power
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {bike.power}
                  </p>
                </div>
                <div className="w-px h-8 bg-gray-300"></div>
                <div className="text-center px-2">
                  <p className="text-base mb-1" style={{ color: "#404040" }}>
                    Weight
                  </p>
                  <p className="text-lg font-semibold text-black">
                    {bike.weight}
                  </p>
                </div>
              </div>

              <hr className="my-4 w-full border-gray-200" />
              <p
                className="text-base font-semibold"
                style={{ color: "#404040" }}
              >
                Starting at
                <span className="text-black font-bold text-lg">
                  &nbsp;&nbsp;{bike.price}
                </span>
              </p>

              <div className="mt-4 flex gap-3 flex-wrap justify-center">
                <button className="btn-submit px-4 py-2 rounded">
                  Know More
                </button>
                <button className="btn-view px-4 py-2 rounded">
                  Test Ride
                </button>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </AnimatePresence>
      {/* Bottom Link */}
      <div className="mt-10 text-center">
        <a
          href="#"
          className="inline-flex items-center text-lg font-semibold hover:underline"
          style={{ color: "#1D3D85" }}
        >
          View All {activeCategory} <AiOutlineRight className="ml-1" />
        </a>
      </div>
    </motion.div>
  );
};

export default Product;
