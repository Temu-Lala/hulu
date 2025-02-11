"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { FaHandshake, FaRegLightbulb, FaMapMarkerAlt, FaTrophy } from "react-icons/fa";
import { LanguageContext } from '../../contexts/LanguageContext';

const AboutPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth <= 768);
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/about.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
                const jsonData = await response.json();
                setPageData(jsonData);
            } catch (error) {
                console.error("Could not fetch about content:", error);
                setPageData({ error: "Failed to load about content." });
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, [language]);

    // Variants for the overall container of card sections (for stagger effect)
    const sectionContainerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3, // Delay before animating children (cards)
                staggerChildren: 0.2, // Stagger animation of cards
            },
        },
    };

    const itemVariants = { // General item variants for text content (Hero section)
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.7,
                ease: "easeInOut",
            },
        },
    };

    const cardVariants = {
        offscreen: {  // Entrance animation when scrolling into view
            y: 100,
            opacity: 0,
            rotate: -5,
        },
        onscreen: {
            y: 0,
            opacity: 1,
            rotate: 0,
            transition: {
                type: "spring",
                bounce: 0.4,
                duration: 0.8,
            },
        },
        hover: {  // Hover animation
            scale: 1.08,
            rotateX: -7, // Slightly more pronounced rotation on hover
            rotateY: 7,
            translateY: -10, // Slightly more pronounced translateY on hover
            transition: {
                type: "spring",
                bounce: 0.3,
                duration: 0.3,
            },
            zIndex: 10, // Ensure hovered card is on top
            boxShadow: "0 20px 40px rgba(0, 0, 0, 0.5)", // More pronounced shadow on hover
        },
        autoAnimate: { // Subtle auto animation (still kept)
            rotateX: [0, 1, -1, 1, -1, 0],
            rotateY: [0, -1, 1, -1, 1, 0],
            translateY: [0, -1, 1, -1, 1, 0],
            transition: {
                duration: 10,
                repeat: Infinity,
                ease: "easeInOut",
            },
        },
    };

    const iconVariants = {
        hidden: {  // Icon entrance animation
            opacity: 0,
            scale: 0.5,
            y: 20,
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                bounce: 0.5,
                duration: 0.6,
                delay: 0.2 // Slightly delay icon entrance after card
            },
        },
        animate: { // Continuous subtle icon animation (still kept)
            rotate: [0, 30, -30, 30, -30, 0],
            y: [0, -5, 5, -5, 5, 0],
            transition: {
                duration: 8,
                repeat: Infinity,
                ease: "linear",
            },
        },
        hover: { // Enhanced icon animation on card hover
            scale: 1.2, // Slightly scale up on hover
            rotate: [0, 45, -45, 45, -45, 0], // Faster and wider rotation on hover
            y: [0, -8, 8, -8, 8, 0], // More vertical movement on hover
            transition: {
                duration: 5, // Faster animation on hover
                repeat: Infinity,
                ease: "linear",
            },
        },
    };


    if (loading) return <div className="min-h-screen bg-gray-50 py-20 px-8 md:px-24 flex justify-center items-center">Loading About Content...</div>;
    if (!pageData || pageData.error) return <div className="min-h-screen bg-gray-50 py-20 px-8 md:px-24 flex justify-center items-center">Error loading About Content.</div>;

    return (
        <motion.div
            className="min-h-screen bg-cover bg-center py-20 px-8 md:px-24 relative"
            style={{ backgroundImage: "url('/handshake.gif')" }}
            initial="hidden"
            animate="visible"
            variants={itemVariants} // Using itemVariants for the page container itself
        >
            {/* Overlay for background GIF */}
            <div className="absolute inset-0 bg-white bg-opacity-70 backdrop-blur-sm"></div>

            <div className="max-w-7xl mx-auto relative z-10">
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="mb-16 text-center">
                    <motion.h1
                        className="text-4xl md:text-6xl font-extrabold mb-4 text-blue-800"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
                    >
                        {pageData.heroSection?.title}
                    </motion.h1>
                    <motion.p
                        className="text-lg md:text-xl leading-relaxed text-gray-700 max-w-2xl mx-auto"
                        style={{ textShadow: "1px 1px 2px rgba(0,0,0,0.1)" }}
                    >
                        {pageData.heroSection?.description}
                    </motion.p>
                </motion.div>

                {/* Story, Mission, Values Cards Section with Section Container Animation */}
                <motion.div
                    variants={sectionContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }} // Start animation when 50% of section is visible
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    {/* Story Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        animate="autoAnimate"
                        className="rounded-xl p-8 bg-white shadow-md hover:shadow-xl transform-3d transition-all duration-300"
                    >
                        <motion.div
                            className="text-4xl text-blue-700 mb-4 mx-auto inline-block"
                            variants={iconVariants}
                            initial="hidden" // Icon entrance animation
                            whileInView="visible" // Icon entrance animation
                            animate="animate" // Continuous icon animation
                            whileHover="hover"  // Enhanced icon animation on card hover
                        >
                            <FaMapMarkerAlt />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 text-blue-800">{pageData.storySection?.title}</h3>
                        <p className="text-gray-700">{pageData.storySection?.description}</p>
                    </motion.div>

                    {/* Mission Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        animate="autoAnimate"
                        className="rounded-xl p-8 bg-white shadow-md hover:shadow-xl transform-3d transition-all duration-300"
                    >
                        <motion.div
                            className="text-4xl text-blue-700 mb-4 mx-auto inline-block"
                            variants={iconVariants}
                            initial="hidden" // Icon entrance animation
                            whileInView="visible" // Icon entrance animation
                            animate="animate" // Continuous icon animation
                            whileHover="hover"  // Enhanced icon animation on card hover
                        >
                            <FaRegLightbulb />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 text-blue-800">{pageData.missionSection?.title}</h3>
                        <p className="text-gray-700">{pageData.missionSection?.description}</p>
                    </motion.div>

                    {/* Values Card */}
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        animate="autoAnimate"
                        className="rounded-xl p-8 bg-white shadow-md hover:shadow-xl transform-3d transition-all duration-300"
                    >
                        <motion.div
                            className="text-4xl text-blue-700 mb-4 mx-auto inline-block"
                            variants={iconVariants}
                            initial="hidden" // Icon entrance animation
                            whileInView="visible" // Icon entrance animation
                            animate="animate" // Continuous icon animation
                            whileHover="hover"  // Enhanced icon animation on card hover
                        >
                            <FaHandshake />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 text-blue-800">{pageData.valuesSection?.title}</h3>
                        <ul className="text-gray-700 list-disc pl-5">
                            {pageData.valuesSection?.values?.map((value, index) => (
                                <li key={index} className="mb-1">{value}</li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Team Cards Section with Section Container Animation */}
                <motion.div
                    variants={sectionContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }} // Start animation when 50% of section is visible
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
                >
                    {pageData.teamSection?.members?.map((member, index) => (
                        <motion.div
                            key={index}
                            variants={cardVariants}
                            whileHover="hover"
                            animate="autoAnimate"
                            className="rounded-xl p-8 bg-white shadow-md hover:shadow-xl transform-3d transition-all duration-300"
                        >
                            <div className="flex justify-center mb-4">
                                <img
                                    src={member.imgSrc}
                                    alt={member.name}
                                    className="w-32 h-32 rounded-full border-4 border-blue-200 shadow-md"
                                />
                            </div>
                            <h3 className="text-xl font-bold mb-2 text-blue-800">{member.name}</h3>
                            <p className="text-gray-700">{member.role}</p>
                            <p className="text-gray-700 mt-4">{member.description}</p>
                        </motion.div>
                    ))}
                </motion.div>

                {/* Achievements Card Section with Section Container Animation */}
                <motion.div
                    variants={sectionContainerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.5 }} // Start animation when 50% of section is visible
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16 justify-center"
                >
                    <motion.div
                        variants={cardVariants}
                        whileHover="hover"
                        animate="autoAnimate"
                        className="rounded-xl p-8 bg-white shadow-md hover:shadow-xl transform-3d transition-all duration-300 text-center md:col-span-2 lg:col-span-1"
                    >
                        <motion.div
                            className="text-4xl text-blue-700 mb-4 mx-auto inline-block"
                            variants={iconVariants}
                            initial="hidden" // Icon entrance animation
                            whileInView="visible" // Icon entrance animation
                            animate="animate" // Continuous icon animation
                            whileHover="hover"  // Enhanced icon animation on card hover
                        >
                            <FaTrophy />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 text-blue-800">{pageData.achievementsSection?.title}</h3>
                        <p className="text-gray-700">{pageData.achievementsSection?.description}</p>
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <motion.h2
                        className="text-3xl md:text-4xl font-bold mb-4 text-blue-800"
                        style={{ textShadow: "2px 2px 4px rgba(0,0,0,0.1)" }}
                    >
                        {pageData.ctaSection?.title}
                    </motion.h2>
                    <motion.button
                        whileHover={{ scale: 1.1, boxShadow: "0 5px 15px rgba(0, 0, 0, 0.2)" }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full text-lg shadow-md transition-shadow duration-200"
                    >
                        {pageData.ctaSection?.buttonText}
                    </motion.button>
                </motion.div>
            </div>
        </motion.div>
    );
};

export default AboutPage;