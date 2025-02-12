"use client";

import {
    FiBriefcase,
    FiTrendingUp,
    FiShoppingCart,
    FiGlobe,
    FiUsers,
    FiHome,
    FiMap,
    FiShare2,
    FiCode,
    FiLayers,
} from "react-icons/fi";
import { FaCar } from "react-icons/fa";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useState, useRef, useEffect, useContext } from "react";
import { LanguageContext } from '../../contexts/LanguageContext';

const ServicesPage = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const ref = useRef(null);
    const { scrollXProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"],
    });
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/services.json`);
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
    }, [language]);

    if (loading) {
        return <p className="text-gray-700">Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p className="text-red-500">Error loading content.</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-16 px-6">
            <h1 className="text-4xl md:text-5xl font-extrabold  mb-12 text-center drop-shadow-md">
                {pageData.pageTitle}
            </h1>

            <div className="relative w-full max-w-7xl">
                <motion.div
                    ref={ref}
                    className="flex overflow-x-scroll scroll-smooth snap-x snap-mandatory scrollbar-hide perspective" // Added perspective here for 3D effect
                    style={{ scrollSnapType: 'x mandatory', perspective: '1000px' }} // Perspective also set here for older browsers if needed
                    animate={{ x: `-${currentIndex * 100}%` }}
                    transition={{ duration: 0.5 }}
                >
                    {pageData.services.map((service, index) => (
                        <motion.div
                            key={index}
                            className="shadow-xl rounded-xl p-6 md:p-8 w-80 md:w-96 shrink-0 snap-center transform-gpu" // shadow-xl for stronger shadow, transform-gpu for 3D
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1, rotateY: 0 }} // Added rotateY: 0 to reset rotation after hover
                            transition={{ duration: 0.5, delay: index * 0.07, ease: "easeOut" }}
                            whileHover={{ scale: 1.05, y: -5, rotateY: 10, shadow: '2xl' }} // rotateY on hover for 3D tilt, shadow-2xl for even stronger hover shadow
                            style={{ marginRight: '24px' }}
                        >
                            <div className="flex flex-col items-center text-center">
                                <motion.div
                                    className="mb-6"
                                    animate={{
                                        rotate: [0, -5, 5, -3, 3, 0],
                                    }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        ease: "easeInOut",
                                    }}
                                >
                                    {(() => {
                                        const iconColorClass = "";
                                        const iconSizeClass = "text-5xl md:text-6xl";

                                        switch (service.iconName) {
                                            case 'FiBriefcase': return <FiBriefcase className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiTrendingUp': return <FiTrendingUp className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiShoppingCart': return <FiShoppingCart className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiGlobe': return <FiGlobe className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiUsers': return <FiUsers className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiHome': return <FiHome className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiMap': return <FiMap className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiShare2': return <FiShare2 className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiCode': return <FiCode className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FiLayers': return <FiLayers className={`${iconColorClass} ${iconSizeClass}`} />;
                                            case 'FaCar': return <FaCar className={`${iconColorClass} ${iconSizeClass}`} />;
                                            default: return null;
                                        }
                                    })()}
                                </motion.div>
                                <h3 className="text-lg md:text-xl font-semibold  mb-2">{service.title}</h3>
                                <p className=" text-sm md:text-base">{service.description}</p>
                                <a href="#" className=" hover:underline mt-3 text-sm md:text-base font-medium">{pageData.learnMoreText}</a>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default ServicesPage;