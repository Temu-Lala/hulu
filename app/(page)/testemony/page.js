"use client";

import { motion } from "framer-motion";
import { FaSmile, FaStar, FaThumbsUp } from "react-icons/fa"; // Using React Icons for emojis

const testimonials = [
  {
    name: "Tedros ",
    role: "CEO, Tech Innovations",
    image: "/images/T.webt",
    feedback:
      "This service helped me scale my business rapidly. Their solutions are top-notch, and the team is highly professional.",
    icon: <FaThumbsUp size={24} className="text-blue-500" />, // Thumbs-up emoji
  },
  {
    name: " Fasika ",
    role: "Marketing Director, Creative Agency",
    image: "/images/f.png",
    feedback:
      "I am impressed by the results! The attention to detail and the ability to meet tight deadlines was exceptional.",
    icon: <FaSmile size={24} className="text-blue-500" />, // Smile emoji
  },
  {
    name: "Emebet",
    role: "Founder, StartUp X",
    image: "/images/e.png",
    feedback:
      "A game-changer for our operations. Their approach is innovative, and they truly understand customer needs.",
    icon: <FaStar size={24} className="text-blue-500" />, // Star emoji
  },
  {
    name: "Girum",
    role: "CTO, FinTech Solutions",
    image: "/images/g.jpg",
    feedback:
      "The team's support and expertise helped us reach our targets ahead of time. Excellent service!",
    icon: <FaThumbsUp size={24} className="text-blue-500" />, // Thumbs-up emoji
  },
  {
    name: "Ftsum",
    role: "COO, HealthTech",
    image: "/images/f.png",
    feedback:
      "Professional, efficient, and always on point. Their service helped us streamline our operations.",
    icon: <FaStar size={24} className="text-blue-500" />, // Star emoji
  },
  {
    name: "Estifanos",
    role: "Founder, Creative Studios",
    image: "/images/e.png",
    feedback:
      "A fantastic experience from start to finish. The team made everything so simple and seamless.",
    icon: <FaSmile size={24} className="text-blue-500" />, // Smile emoji
  },
  {
    name: "David ",
    role: "VP of Sales, Marketing Hub",
    image: "/images/d.jpg",
    feedback:
      "Their solutions enabled us to enhance our sales process, making it faster and more reliable.",
    icon: <FaThumbsUp size={24} className="text-blue-500" />, // Thumbs-up emoji
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 ">
      <div className="max-w-screen-xl mx-auto px-6 text-center">
        <h2 className="text-3xl font-extrabold text-blue-700 mb-8">What Our Clients Say</h2>

        <motion.div
          className="flex space-x-6 pb-4 overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="flex space-x-6"
            animate={{ x: "-100%" }}
            transition={{
              duration: 20,
              repeat: Infinity,
              repeatType: "loop",
              ease: "linear",
            }}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-white p-8 rounded-lg shadow-xl w-80 flex-none transform transition-all duration-300 hover:scale-105 hover:shadow-2xl"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
                  />
                </div>
                <p className="text-xl font-semibold text-blue-700">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.role}</p>
                <div className="mt-4 text-gray-600 italic">{testimonial.feedback}</div>
                <div className="mt-4 flex justify-center items-center space-x-2">
                  <span>{testimonial.icon}</span> {/* Emoji Icon */}
                  <span className="text-xl text-blue-500">⭐⭐⭐⭐⭐</span> {/* Star Rating */}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
