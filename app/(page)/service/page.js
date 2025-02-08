"use client";

import { FiBriefcase, FiTrendingUp, FiShoppingCart, FiGlobe, FiUsers, FiHome, FiMap, FiShare2, FiCode, FiLayers } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { motion, useScroll } from "framer-motion";
import { useState, useRef } from "react";

const services = [
  {
    title: "Work Opportunity Hiring",
    description: "We connect job seekers with employers, making hiring seamless and efficient.",
    icon: <FiBriefcase className="text-blue-500 text-6xl" />,
  },
  {
    title: "Promotions",
    description: "Boost your brand's visibility with our strategic marketing and promotional services.",
    icon: <FiTrendingUp className="text-blue-500 text-6xl" />,
  },
  {
    title: "Buying & Selling Goods",
    description: "We facilitate secure and hassle-free transactions for all types of goods.",
    icon: <FiShoppingCart className="text-blue-500 text-6xl" />,
  },
  {
    title: "Import & Export",
    description: "Expand your business with international trade solutions tailored to your needs.",
    icon: <FiGlobe className="text-blue-500 text-6xl" />,
  },
  {
    title: "Business Advisory & Promotions",
    description: "We provide expert advice and promotional strategies to help your business grow.",
    icon: <FiUsers className="text-blue-500 text-6xl" />,
  },
  {
    title: "Manpower Services",
    description: "Find skilled workers for your business needs with our manpower solutions.",
    icon: <FiBriefcase className="text-blue-500 text-6xl" />,
  },
  {
    title: "Home Buying, Selling & Renting",
    description: "Get the best deals on homes for sale, rent, or purchase.",
    icon: <FiHome className="text-blue-500 text-6xl" />,
  },
  {
    title: "Car Buying, Selling & Renting",
    description: "Whether you’re buying, selling, or renting a car, we have you covered.",
    icon: <FaCar className="text-blue-500 text-6xl" />,
  },
  {
    title: "Land Buying & Selling",
    description: "Secure land deals with professional assistance and legal transparency.",
    icon: <FiMap className="text-blue-500 text-6xl" />,
  },
  {
    title: "Social Media Management & Promotions",
    description: "Grow your online presence with our expert social media management services.",
    icon: <FiShare2 className="text-blue-500 text-6xl" />,
  },
  {
    title: "Software, Website & Mobile App Development",
    description: "We build modern, scalable software solutions tailored to your business.",
    icon: <FiCode className="text-blue-500 text-6xl" />,
  },
  {
    title: "Advertising Materials (Brochures, Stickers, T-Shirts, LED Screens)",
    description: "Get high-quality advertising materials designed for maximum impact.",
    icon: <FiLayers className="text-blue-500 text-6xl" />,
  },
];

const Services = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const ref = useRef(null);
  const { scrollXProgress } = useScroll({
    target: ref, // Use the ref of the container
    offset: ["start end", "end start"] // Optional: Adjust scroll start/end points
  });

  return (
    <div className="min-h-screen  flex flex-col items-center justify-center py-12 px-6">
      <h1 className="text-5xl font-extrabold text-blue-700 mb-10 text-center drop-shadow-lg">
        Our Services
      </h1>

      {/* Circular Progress Indicator */}
      <svg id="progress" width="100" height="100" viewBox="0 0 100 100" className="mb-8">
        <circle cx="50" cy="50" r="30" pathLength="1" className="bg" fill="none" stroke="#e0e0e0" strokeWidth="4"/>
        <motion.circle
          cx="50"
          cy="50"
          r="30"
          pathLength="1"
          className="indicator"
          fill="none"
          stroke="#4f46e5" // Example indicator color
          strokeWidth="4"
          style={{ pathLength: scrollXProgress }}
          transition={{ duration: 0.5 }} // Smooth transition
        />
      </svg>

      <div className="relative w-full max-w-7xl">
        <motion.div
          ref={ref}
          className="flex overflow-x-auto space-x-10 scroll-smooth snap-x snap-mandatory"
          style={{scrollSnapType: 'x mandatory'}}
          animate={{ x: `-${currentIndex * 100}%` }}
          transition={{ duration: 0.5 }}
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              className="bg-white shadow-2xl rounded-3xl p-8 w-80 shrink-0 snap-center"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05, y: -5 }}
            >
              <div className="flex flex-col items-center text-center">
                <div className="mb-5">{service.icon}</div>
                <h3 className="text-xl font-semibold text-blue-700">{service.title}</h3>
                <p className="mt-3 text-gray-600">{service.description}</p>
                <a href="#" className="text-blue-600 hover:underline mt-3">Learn More</a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default Services;
