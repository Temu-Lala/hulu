"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";

const BlogPage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-white text-gray-900 py-16 px-6 md:px-24 min-h-screen">
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-blue-800">Hulu General Commission Blog</h1>
          <p className="text-lg text-gray-600 mt-4">Insights, workshops, and success stories from the world of commission-based business.</p>
        </div>

        {/* Blog Posts */}
        <div className="space-y-12">
          {/* Post 1 */}
          <div className="bg-blue-100 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900">Maximizing Profits with TikTok</h2>
            <p className="text-lg text-gray-700 mt-2">Learn how commission-based companies leverage short-form content for engagement.</p>
            <div className="flex justify-center my-4">
              <iframe className="rounded-lg" width="560" height="315" src="https://www.tiktok.com/@hulugeneralcommission" title="TikTok Strategies"></iframe>
            </div>
            <a href="https://www.tiktok.com/@hulugeneralcommission" className="text-blue-600 font-semibold">Read More</a>
          </div>

          {/* Post 2 */}
          <div className="bg-blue-100 rounded-lg p-8 shadow-lg">
            <h2 className="text-3xl font-bold text-blue-900">Boosting Your Brand with YouTube Ads</h2>
            <p className="text-lg text-gray-700 mt-2">Discover effective strategies for running YouTube campaigns.</p>
            <div className="flex justify-center my-4">
              <iframe className="rounded-lg" width="560" height="315" src="https://youtube.com/@hulugeneralcommission" title="YouTube Marketing"></iframe>
            </div>
            <a href="https://youtube.com/@hulugeneralcommission" className="text-blue-600 font-semibold">Read More</a>
          </div>
        </div>

        {/* Workshop Section */}
        <div className="mt-16 bg-blue-200 p-8 rounded-lg shadow-lg text-center">
          <h2 className="text-4xl font-bold text-blue-900">Upcoming Workshop</h2>
          <p className="text-lg text-gray-700 mt-2">Join our hands-on training session for commission-based entrepreneurs.</p>
          <div className="flex justify-center mt-4">
            <iframe className="rounded-lg" width="560" height="315" src="https://youtube.com/@hulugeneralcommission" title="Workshop Preview"></iframe>
          </div>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <h2 className="text-3xl font-bold text-blue-900">Stay Updated!</h2>
          <p className="text-lg text-gray-700 mt-2">Subscribe to our blog and YouTube channel for more insights.</p>
          <a href="https://youtube.com/@hulugeneralcommission" target="_blank" rel="noopener noreferrer">
            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mt-4">
              Subscribe Now
            </motion.button>
          </a>
        </div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
