import { motion } from "framer-motion";
import img1 from "../../assets/Two Wheelers 5.png";
import img2 from "../../assets/Two Wheelers 5.png";
import img3 from "../../assets/Two Wheelers 5.png";
import img4 from "../../assets/Two Wheelers 5.png";
import { AiOutlineRight } from "react-icons/ai";

const containerVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
      when: "beforeChildren",
      staggerChildren: 0.2,
    },
  },
};

const childVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5 },
  },
};

const topRowVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.6 },
  },
};

const Dealers = () => {
  const labels = [
    "Two-Wheeler",
    "Super Premium",
    "Electric Vehicle",
    "Three-Wheeler",
  ];
  const images = [img1, img2, img3, img4];

  return (
    <div className="dealers-section">
      <div className="dealers-overlay" />
      <motion.div
        className="dealers-content"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: false, amount: 0.2 }}
      >
        {/* Top Content Row */}
        <motion.div className="top-row" variants={topRowVariants}>
          <div className="left-content">
            <h2 className="ride-text">FIND A RIDE NEAR YOU</h2>
            <h1 className="dealers-heading">Dealers</h1>
            <p className="dealers-description">
              Find your nearest authorized TVS Motor dealer with our easy to use
              interactive tool. Get all details including phone numbers,
              address, map and driving directions.
            </p>
          </div>
          <button className="find-dealer-btn">Find A Dealer Near You</button>
        </motion.div>

        {/* Image Cards */}
        <div className="dealer-images">
          {images.map((img, index) => (
            <motion.div
              className="image-card"
              key={index}
              variants={childVariants}
            >
              <div className="image-wrapper">
                <img src={img} alt={`Bike ${index + 1}`} />
                <div className="gradient-overlay" />
                <span className="label">
                  <span className="label-text">
                    {labels[index]} <AiOutlineRight className="label-icon" />
                  </span>
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export default Dealers;
