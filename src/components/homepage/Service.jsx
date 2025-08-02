import React, { useMemo } from "react";
import { motion } from "framer-motion";
import {
  AiOutlineTool,
  AiOutlineSafetyCertificate,
  AiOutlineClockCircle,
  AiOutlineCar,
  AiOutlineCreditCard,
  AiOutlineQuestionCircle,
} from "react-icons/ai";

/* Brand colors (TVS-style) */
const BRAND_BLUE = "#253C80";
const BRAND_RED = "#DC4226";
const CARD_BG = "#ffffff";
const SECTION_BG = "#f4f7fe"; // light base to complement gradient

const services = [
  {
    title: "Premium Bike Service",
    description:
      "Comprehensive maintenance and tune-ups to keep your ride smooth and safe.",
    icon: <AiOutlineTool size={32} />,
  },
  {
    title: "Genuine Spare Parts",
    description:
      "Original TVS parts sourced to ensure performance and longevity.",
    icon: <AiOutlineCar size={32} />,
  },
  {
    title: "Warranty Support",
    description:
      "Fast, reliable claims and coverage with official warranty backing.",
    icon: <AiOutlineSafetyCertificate size={32} />,
  },
  {
    title: "Roadside Assistance",
    description:
      "On-the-go support for breakdowns and emergencies, wherever you ride.",
    icon: <AiOutlineClockCircle size={32} />,
  },
  {
    title: "Easy Financing",
    description: "Flexible ownership plans tailored to your budget and needs.",
    icon: <AiOutlineCreditCard size={32} />,
  },
  {
    title: "Customer Helpdesk",
    description: "Expert support for queries, bookings, and guidance anytime.",
    icon: <AiOutlineQuestionCircle size={32} />,
  },
];

// Card animation variants
const cardVariant = {
  hidden: { opacity: 0, y: 16 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.1 * i,
      type: "spring",
      stiffness: 160,
      damping: 22,
    },
  }),
  hover: { scale: 1.03, boxShadow: "0 18px 45px rgba(37,60,128,0.15)" },
};

const Service = () => {
  const rendered = useMemo(
    () =>
      services.map((svc, idx) => (
        <motion.div
          key={svc.title}
          className="relative bg-white rounded-2xl p-6 flex flex-col gap-4"
          style={{ background: CARD_BG }}
          variants={cardVariant}
          custom={idx}
          initial="hidden"
          whileInView="visible"
          whileHover="hover"
          viewport={{ once: false, amount: 0.35 }}
        >
          <div
            className="inline-flex items-center justify-center w-12 h-12 rounded-full"
            style={{ background: `${BRAND_BLUE}20` }}
          >
            <div style={{ color: BRAND_BLUE }}>{svc.icon}</div>
          </div>
          <h4 className="text-lg font-semibold" style={{ color: BRAND_BLUE }}>
            {svc.title}
          </h4>
          <p className="text-sm text-gray-600 flex-1">{svc.description}</p>
          <div className="mt-2 flex items-center gap-2">
            <span
              className="inline-block text-xs font-semibold px-3 py-1 rounded-full"
              style={{
                background: BRAND_RED,
                color: "#fff",
                letterSpacing: "0.5px",
              }}
            >
              Learn More
            </span>
          </div>
        </motion.div>
      )),
    []
  );

  return (
    <section
      id="services"
      className="relative w-full py-16 px-4 md:px-12 font-nunito"
      style={{
        backgroundImage: `linear-gradient(135deg, ${BRAND_BLUE}08 0%, ${BRAND_RED}05 60%), radial-gradient(circle at 30% 30%, #ffffff 0%, ${SECTION_BG} 80%)`,
      }}
    >
      {/* subtle diagonal stripe overlay */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='120' height='120' viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 120L120 0H110L0 110V120Z' fill='%23253C80' fill-opacity='0.01'/%3E%3Cpath d='M0 100L100 0H90L0 90V100Z' fill='%23DC4226' fill-opacity='0.01'/%3E%3C/svg%3E")`,
          pointerEvents: "none",
        }}
      />

      <div className="max-w-7xl mx-auto relative">
        {/* Heading + intro */}
        <motion.div
          className="mb-8 flex flex-col md:items-start items-center"
          initial={{ opacity: 0, x: -12 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
        >
          <div className="w-full md:pl-12">
            <h2
              className="text-3xl md:text-4xl font-bold"
              style={{ color: BRAND_BLUE }}
            >
              Our Services
            </h2>
            <div
              className="mt-2 h-1 rounded-full"
              style={{
                width: "120px",
                background: `linear-gradient(90deg, ${BRAND_RED}, ${BRAND_BLUE})`,
              }}
            />
            <p className="mt-4 text-gray-700 max-w-2xl">
              From service to support, TVS delivers reliability with speed and
              care. Explore what we offer to keep your ride ahead.
            </p>
          </div>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {rendered}
        </div>
      </div>
    </section>
  );
};

export default Service;
