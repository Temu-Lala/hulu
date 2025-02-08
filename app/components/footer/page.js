"use client";
import { motion } from "framer-motion";
import {
  FaFacebook,
  FaTelegram,
  FaYoutube,
  FaInstagram,
  FaTwitter,
  FaTiktok,
  FaPhoneAlt,
} from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="text-blue-600 py-12 mt-16">
      <div className="container mx-auto px-6">
        {/* Company Logo and Name */}
        <div className="flex justify-between items-center mb-8">
          <div className="flex items-center">
            {/* Company Logo */}
            <img
              src="/hululogo.png"
              alt="Company Logo"
              className="w-16 h-16 mr-4"
            />
            {/* Company Name */}
            <h1 className="text-3xl font-semibold t">Hulu General commissions</h1>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex justify-center space-x-8 mb-8">
        <motion.a
            href="https://www.tiktok.com/@hulugeneralcommission?_t=ZM-8tkGXhB64Af&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <FaTiktok className="text-3xl hover:text-black" />
          </motion.a>
          <motion.a
            href="https://www.facebook.com/share/18ZsZUFnRS/"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <FaFacebook className="text-3xl hover:text-blue-600" />
          </motion.a>

          <motion.a
            href="https://t.me/hulugeneral"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <FaTelegram className="text-3xl hover:text-blue-600" />
          </motion.a>

          <motion.a
            href="https://youtube.com/@hulugeneralcommission?si=kltEn5gY7jPingyp"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <FaYoutube className="text-3xl hover:text-red-600" />
          </motion.a>

          <motion.a
            href="https://www.instagram.com/hulugeneralcommission?igsh=YzExcWtxOHd0dTN1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <FaInstagram className="text-3xl hover:text-pink-600" />
          </motion.a>

          <motion.a
            href="https://www.tiktok.com/@hulugeneralcommission?_t=ZM-8tkGXhB64Af&_r=1"
            target="_blank"
            rel="noopener noreferrer"
            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
            whileHover={{ y: -5 }}
          >
            <FaTwitter className="text-3xl hover:text-blue-500" />
          </motion.a>

       
        </div>

        {/* Contact Information */}
        <div className="mb-8 text-center sm:text-left">
          <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
          <p>Email: hulugeneralcommission@gmail.com</p>
          <div className="flex justify-center space-x-8 mt-4">
            {/* Phone Call Buttons */}
            <motion.a
              href="tel:+251960380000"
              className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transform scale-110 transition-all duration-300"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <FaPhoneAlt className="text-3xl" />
              <span className="text-xs">Phone 1</span>
            </motion.a>

            <motion.a
              href="tel:+251963959694"
              className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transform scale-110 transition-all duration-300"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <FaPhoneAlt className="text-3xl" />
              <span className="text-xs">Phone 2</span>
            </motion.a>

            <motion.a
              href="tel:+251967336700"
              className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transform scale-110 transition-all duration-300"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <FaPhoneAlt className="text-3xl" />
              <span className="text-xs">Phone 3</span>
            </motion.a>

            <motion.a
              href="tel:+251960380000"
              className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transform scale-110 transition-all duration-300"
              animate={{ rotate: [0, 3, -3, 0] }}
              transition={{ repeat: Infinity, duration: 0.5 }}
            >
              <FaPhoneAlt className="text-3xl" />
              <span className="text-xs">Phone 4</span>
            </motion.a>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-8 text-center text-sm opacity-70">
          &copy; 2025 Hulu General Commission. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
