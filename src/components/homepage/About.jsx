import React from "react";
import { motion } from "framer-motion";

const textVariant = {
  hidden: { x: -100, opacity: 0 },
  visible: (custom) => ({
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      delay: custom * 0.3,
      ease: "easeOut",
      type: "tween",
    },
  }),
};

const About = () => {
  return (
    <div className="py-16 font-nunito" style={{ backgroundColor: "#202020" }}>
      <div
        className="w-full max-w-7xl mx-auto flex flex-col gap-6 
        px-4 sm:px-6 md:px-8 lg:px-10
        items-center sm:items-start
        text-center sm:text-left"
      >
        <motion.h2
          custom={0}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={textVariant}
          className="sm:text-3xl font-semibold"
          style={{ color: "#757575", fontSize: "20px" }}
        >
          What Guides Us
        </motion.h2>

        <motion.h1
          custom={1}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={textVariant}
          className="text-white  font-bold"
          style={{ fontSize: "40px" }}
        >
          About Us
        </motion.h1>

        <motion.p
          custom={2}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.5 }}
          variants={textVariant}
          className="text-base sm:text-lg leading-relaxed max-w-7xl"
          style={{ color: "#CACACA" }}
        >
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Dolore eius
          eum harum animi sequi voluptatibus unde quis molestiae suscipit
          consectetur et ullam ipsum consequuntur soluta debitis, tempora omnis
          non voluptatem ipsa, quos molestias maiores. Tenetur voluptate, ea
          recusandae magnam provident ipsum pariatur perspiciatis, rerum
          excepturi consectetur commodi. Qui alias accusamus odio iure ad
          impedit, modi beatae placeat id iusto possimus dolores nobis numquam?
          Ipsum cupiditate provident fuga pariatur ex doloremque deleniti
          nostrum eos, ipsam ab odit ipsa a voluptates id ad, repellendus
          obcaecati distinctio tenetur molestiae? Saepe facilis accusamus et
          eius recusandae excepturi adipisci aspernatur expedita placeat cum, in
          optio?
        </motion.p>
      </div>
    </div>
  );
};

export default About;
