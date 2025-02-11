"use client";

import { motion } from "framer-motion";
import { FaSmile, FaStar, FaThumbsUp } from "react-icons/fa"; // Using React Icons for emojis

import { useState, useEffect, useContext } from "react"; // Import useEffect and useContext
import { LanguageContext } from '../../contexts/LanguageContext'; // Import LanguageContext


const Testimonials = () => {
    const [pageData, setPageData] = useState(null); // State for JSON data
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext); // Consume language context


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/testimonials.json`); // Fetch JSON based on language
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setPageData(jsonData);
            } catch (error) {
                console.error("Could not fetch content:", error);
                setPageData({ error: "Failed to load content." });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]); // Re-fetch data when language state from Context changes


    if (loading) {
        return <p>Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p>Error loading content.</p>;
    }


    return (
        <section className="py-16 ">
            <div className="max-w-screen-xl mx-auto px-6 text-center">
                <h2 className="text-3xl font-extrabold text-blue-700 mb-8">{pageData.pageTitle}</h2> {/* Page title from JSON */}

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
                        {pageData.testimonials.map((testimonial, index) => ( // Testimonials from JSON
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
                                <p className="text-xl font-semibold text-blue-700">{testimonial.name}</p> {/* Testimonial name from JSON */}
                                <p className="text-sm text-gray-500">{testimonial.role}</p> {/* Testimonial role from JSON */}
                                <div className="mt-4 text-gray-600 italic">{testimonial.feedback}</div> {/* Testimonial feedback from JSON */}
                                <div className="mt-4 flex justify-center items-center space-x-2">
                                    <span>
                                        {(() => { // Render icon dynamically based on iconName from JSON
                                            switch (testimonial.iconName) {
                                                case 'FaThumbsUp': return <FaThumbsUp size={24} className="text-blue-500" />;
                                                case 'FaSmile': return <FaSmile size={24} className="text-blue-500" />;
                                                case 'FaStar': return <FaStar size={24} className="text-blue-500" />;
                                                default: return null; // Or a default icon
                                            }
                                        })()}
                                    </span>
                                    <span className="text-xl text-blue-500">{testimonial.rating}</span> {/* Testimonial rating from JSON */}
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
