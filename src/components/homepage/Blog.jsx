import React from "react";
import { motion } from "framer-motion";
import blog1 from "../../assets/blog_image.png";
import blog2 from "../../assets/blog_image.png";
import blog3 from "../../assets/blog_image.png";
import { AiOutlineRight } from "react-icons/ai";

const blogData = [
  {
    image: blog1,
    title: "Exciting TVS Launch",
    desc: "Discover the latest models and technology in TVS bikes and scooters.",
    date: "July 25, 2025",
  },
  {
    image: blog2,
    title: "Maintenance Tips",
    desc: "Learn how to keep your TVS vehicle running like new.",
    date: "July 22, 2025",
  },
  {
    image: blog3,
    title: "Behind the Scenes",
    desc: "Go inside the innovation labs of TVS Motors.",
    date: "July 18, 2025",
  },
];

const cardVariant = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.2, duration: 0.6 },
  }),
};

export default function Blog() {
  return (
    <div
      className="min-h-auto px-6 py-16 font-nunito"
      style={{ backgroundColor: "#F3F3F3" }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-12">
          <h2 className="font-bold mb-6 sm:mb-0" style={{ fontSize: "40px" }}>
            TVS Blogs
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogData.map((blog, index) => (
            <motion.div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col justify-between"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: false, amount: 0.2 }}
              custom={index}
              variants={cardVariant}
            >
              <img
                src={blog.image}
                alt={blog.title}
                className="w-full h-50 object-cover"
              />
              <div className="p-4 flex flex-col justify-between h-full gap-4">
                <div>
                  <h3 className="text-xl font-semibold text-[#202020]">
                    {blog.title}
                  </h3>
                  <p className="text-sm text-gray-500">{blog.desc}</p>
                </div>
                <div className="flex justify-between items-center text-sm">
                  <span className="text-gray-400">{blog.date}</span>
                  <button
                    className="text-white px-10 py-2 text-sm hover:bg-gray-800 transition"
                    style={{ backgroundColor: "#1D3D85" }}
                  >
                    Read More
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Blogs Link */}
        <div className="mt-10 text-center">
          <a
            href="#"
            className="inline-flex items-center text-lg font-semibold hover:underline"
            style={{ color: "#1D3D85" }}
          >
            View All Blogs <AiOutlineRight className="ml-1" />
          </a>
        </div>
      </div>
    </div>
  );
}
