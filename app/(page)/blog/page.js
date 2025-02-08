"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import { FaTiktok, FaTwitter, FaYoutube, FaInstagram, FaLinkedin } from "react-icons/fa"; // Import additional icons

const BlogPage = () => {
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

  return (
    <div className=" text-white py-20 px-8 md:px-24 min-h-screen">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Blog Title */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl md:text-6xl font-bold text-blue-800 mb-4">Commission-Based Marketing Insights</h1>
          <p className="text-lg md:text-xl text-blue-700 leading-relaxed">
            Explore innovative strategies for commission-based companies, featuring insights from TikTok, YouTube, and other platforms.
          </p>
        </motion.div>

        {/* Post 1 */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className=" text-blue-600 bg-slate-300 rounded-lg p-8 shadow-lg ">
            <h2 className="text-3xl font-bold mb-4">Maximizing Profits with TikTok</h2>
            <p className="text-lg mb-4">
              TikTok is transforming digital marketing. Learn how commission-based companies are leveraging short-form content for massive engagement.
            </p>
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-center">
                <button
                  className="text-blue-600 bg-slate-300 font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
                  onClick={() => window.location.href = 'https://www.tiktok.com/@hulugeneralcommission?_t=ZM-8tkGXhB64Af&_r=1'}
                >
                  <FaTiktok size={24} />
                  <span>Read More</span>
                </button>
              </div>
            </motion.div>
            <p className="text-lg">
              Discover how TikTok's algorithm and viral trends can help commission-based businesses grow exponentially by targeting the right audience.
            </p>
          </div>
        </motion.div>

        {/* Post 2 */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="text-blue-600 bg-slate-300 rounded-lg p-8 shadow-lg ">
            <h2 className="text-3xl font-bold mb-4">Boosting Your Brand with YouTube Ads</h2>
            <p className="text-lg mb-4">
              YouTube offers great opportunities for commission-based marketers to run targeted ads. Learn strategies for creating impactful YouTube campaigns.
            </p>
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-center">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
                  onClick={() => window.location.href = '/next-post'}
                >
                  <FaYoutube size={24} />
                  <span>Read More</span>
                </button>
              </div>
            </motion.div>
            <p className="text-lg">
              Learn how commission-based companies can use YouTube's ad platform to reach a wider audience and increase conversions effectively.
            </p>
          </div>
        </motion.div>

        {/* Post 3 */}
        <motion.div variants={itemVariants} className="mb-16">
          <div className="bg-gradient-to-t text-blue-600 bg-slate-300 rounded-lg p-8 shadow-lg ">
            <h2 className="text-3xl font-bold mb-4">Building a Personal Brand on Instagram</h2>
            <p className="text-lg mb-4">
              Instagram is perfect for building a personal brand. Learn how commission-based marketers can use Instagram to grow their audience and drive sales.
            </p>
            <motion.div variants={itemVariants} className="mb-8">
              <div className="flex justify-center">
                <button
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg flex items-center space-x-2"
                  onClick={() => window.location.href = 'https://www.instagram.com/hulugeneralcommission?igsh=YzExcWtxOHd0dTN1'}
                >
                  <FaInstagram size={24} />
                  <span>Read More</span>
                </button>
              </div>
            </motion.div>
            <p className="text-lg">
              Instagram's visual platform offers commission-based businesses a unique opportunity to connect with potential customers through engaging posts.
            </p>
          </div>
        </motion.div>

        {/* Post 4 */}
     

      

        {/* Call to Action */}
        <motion.div variants={itemVariants} className="text-center mt-16">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated!</h2>
        
        {/* YouTube link wrapped around the button */}
        <motion.a
          href="https://youtube.com/@hulugeneralcommission?si=kltEn5gY7jPingyp" // Replace with your YouTube channel URL
          target="_blank" // Open in a new tab
          rel="noopener noreferrer" // Security measure when opening a new tab
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg"
          >
            Subscribe to Our Blog
          </motion.button>
        </motion.a>
      </motion.div>
      </motion.div>
    </div>
  );
};

export default BlogPage;
