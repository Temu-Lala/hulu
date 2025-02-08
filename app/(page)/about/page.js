"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaHandshake, FaRegLightbulb, FaUsers, FaTrophy, FaMapMarkerAlt } from "react-icons/fa";

const AboutPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Check on initial mount

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, staggerChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1, ease: "easeOut" } },
  };

  const continuousAnimationVariants = {
    animate: {
      rotate: [0, 360],
      transition: {
        duration: 10,
        repeat: Infinity,
        ease: "linear",
      },
    },
  };

  return (
    <div className="min-h-screen bg-cover bg-center  py-20 px-8 md:px-24" style={{ backgroundImage: "url('/handshake.gif')" }}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Hero Section */}
        <motion.div variants={itemVariants} className="mb-16">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">About HULU General Commission</h1>
          <p className="text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto">
            HULU General Commission is a forward-thinking organization dedicated to creating innovative commission solutions for businesses of all sizes. Our mission is to optimize sales strategies and build lasting partnerships for sustainable growth.
          </p>
        </motion.div>

        {/* Our Story */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            variants={fadeInVariants}
            className="bg-gradient-to-t  bg-slate-200 rounded-lg p-8 shadow-lg text-center transform transition duration-500 hover:scale-105"
          >
            <motion.div
              variants={continuousAnimationVariants}
              className="text-4xl text-white mb-4"
            >
              <FaMapMarkerAlt />
            </motion.div>
            <h3 className="text-xl font-bold mb-2  text-blue-600">Our Story</h3>
            <p className="text-lg  text-blue-600">Founded in 2024, HULU General Commission started with a simple goal: to revolutionize the way companies approach sales commissions.</p>
          </motion.div>

          {/* Mission */}
          <motion.div
            variants={fadeInVariants}
            className=" rounded-lg p-8 bg-slate-200 shadow-lg text-center transform transition duration-500 hover:scale-105"
          >
            <motion.div
              variants={continuousAnimationVariants}
              className="text-4xl  text-blue-600 mb-4"
            >
              <FaRegLightbulb />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-blue-600">Our Mission</h3>
            <p className="text-lg text-blue-600">Our mission is to empower businesses with strategic commission programs that drive growth, enhance performance, and strengthen partnerships.</p>
          </motion.div>

          {/* Values */}
          <motion.div
            variants={fadeInVariants}
            className="text-blue-600 rounded-lg p-8 bg-slate-200 shadow-lg text-center transform transition duration-500 hover:scale-105"
          >
            <motion.div
              variants={continuousAnimationVariants}
              className="text-4xl text-blue-600 mb-4"
            >
              <FaHandshake />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-blue-600">Our Values</h3>
            <ul className="text-lg text-blue-600">
              <li>Integrity</li>
              <li>Innovation</li>
              <li>Collaboration</li>
              <li>Results-Oriented</li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Personal Cards for Team */}
        <motion.div variants={itemVariants} className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {[{
            name: "Getfam Hotel Manager",
            role: "GETFAM Hotel",
            description: "⭐⭐⭐⭐⭐ Excellent Service & Professionalism Hulu General Commissions has exceeded our expectations! Their dedication, professionalism, and quality service make them a trusted partner in every aspect. Highly recommended!",
            imgSrc: "/images/image4.jpg"
          }, {
            name: "Bemnet Hotel Manager",
            role: "Manager",
            description:" ⭐⭐⭐⭐⭐ Reliable & Trustworthy We are extremely satisfied with the outstanding services provided by Hulu General Commissions. Their commitment to excellence and attention to detail make them a top choice!",
            imgSrc: "/images/image16.png"
          }, {
            name: "Siyum Belayneh ",
            role: "Developer",
            description: "⭐⭐⭐⭐⭐ Hulu General Commissions delivers high-quality service with efficiency and professionalism. Truly a five-star service!",
            imgSrc: "/images/image8n.png"
          }].map((member, index) => (
            <motion.div
              key={index}
              variants={fadeInVariants}
              className=" rounded-lg p-8 bg-slate-200 shadow-lg text-center transform transition duration-500 hover:scale-105"
            >
              <div className="flex bg-slate-200 justify-center mb-4">
                <img
                  src={member.imgSrc}
                  alt={member.name}
                  className="w-32 h-32 rounded-full border-4 border-white"
                />
              </div>
              <h3 className="text-xl font-bold mb-2 text-blue-600">{member.name}</h3>
              <p className="text-lg text-blue-600">{member.role}</p>
              <p className="text-blue-600 mt-4">{member.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* Achievements & Milestones */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            variants={fadeInVariants}
            className=" rounded-lg p-8 bg-slate-200 shadow-lg text-center transform transition duration-500 hover:scale-105"
          >
            <motion.div
              variants={continuousAnimationVariants}
              className="text-4xl text-white mb-4"
            >
              <FaTrophy />
            </motion.div>
            <h3 className="text-xl font-bold mb-2 text-blue-600">Our Achievements</h3>
            <p className="text-lg text-blue-600">Over the years, we have proudly achieved several milestones including [List Key Achievements].</p>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Take the Next Step?</h2>
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className=" hover:bg-blue-700 text-blue-600 font-bold py-3 px-6 rounded-lg text-lg"
          >
            Contact Us
          </motion.button>
        </motion.div>

        {/* Contact Information */}
      </motion.div>
    </div>
  );
};

export default AboutPage;
