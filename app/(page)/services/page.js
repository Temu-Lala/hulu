"use client";

import { FiBriefcase, FiTrendingUp, FiShoppingCart, FiGlobe, FiUsers, FiHome, FiMap, FiShare2, FiCode, FiLayers } from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { motion, useScroll } from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react"; // Import useEffect and useContext
import { LanguageContext } from '../../contexts/LanguageContext'; // Import LanguageContext

const ServicesPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({
        target: ref, // Use the ref of the container
        offset: ["start end", "end start"] // Optional: Adjust scroll start/end points
    });
    const [pageData, setPageData] = useState(null); // State for JSON data
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext); // Consume language context


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/services.json`); // Fetch JSON based on language
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
        <div className="min-h-screen  flex flex-col items-center justify-center py-12 px-6">
            <h1 className="text-5xl font-extrabold text-blue-700 mb-10 text-center drop-shadow-lg">
                {pageData.pageTitle} {/* Page Title from JSON */}
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
                    {pageData.services.map((service, index) => (  // Services data from JSON
                        <motion.div
                            key={index}
                            className="bg-white shadow-2xl rounded-3xl p-8 w-80 shrink-0 snap-center"
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            whileHover={{ scale: 1.05, y: -5 }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <div className="mb-5">
                                    {(() => { // Render icon dynamically based on iconName from JSON
                                        switch (service.iconName) {
                                            case 'FiBriefcase': return <FiBriefcase className="text-blue-500 text-6xl" />;
                                            case 'FiTrendingUp': return <FiTrendingUp className="text-blue-500 text-6xl" />;
                                            case 'FiShoppingCart': return <FiShoppingCart className="text-blue-500 text-6xl" />;
                                            case 'FiGlobe': return <FiGlobe className="text-blue-500 text-6xl" />;
                                            case 'FiUsers': return <FiUsers className="text-blue-500 text-6xl" />;
                                            case 'FiHome': return <FiHome className="text-blue-500 text-6xl" />;
                                            case 'FiMap': return <FiMap className="text-blue-500 text-6xl" />;
                                            case 'FiShare2': return <FiShare2 className="text-blue-500 text-6xl" />;
                                            case 'FiCode': return <FiCode className="text-blue-500 text-6xl" />;
                                            case 'FiLayers': return <FiLayers className="text-blue-500 text-6xl" />;
                                            case 'FaCar': return <FaCar className="text-blue-500 text-6xl" />;
                                            default: return null; // Or a default icon
                                        }
                                    })()}
                                </div>
                                <h3 className="text-xl font-semibold text-blue-700">{service.title}</h3> {/* Service title from JSON */}
                                <p className="mt-3 text-gray-600">{service.description}</p> {/* Service description from JSON */}
                                <a href="#" className="text-blue-600 hover:underline mt-3">{pageData.learnMoreText}</a> {/* "Learn More" text from JSON */}
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;