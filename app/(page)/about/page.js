"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react"; // Import useContext
import { FaHandshake, FaRegLightbulb, FaMapMarkerAlt, FaTrophy } from "react-icons/fa"; // Keep FaTrophy import
import { LanguageContext } from '../../contexts/LanguageContext'; // Import LanguageContext

const AboutPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [pageData, setPageData] = useState(null); // State for JSON data
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext); // Consume language context


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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/about.json`); // Fetch JSON based on language
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
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
    }, [language]); // Re-fetch data when language state from Context changes

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

    if (loading) {
        return <div className="min-h-screen bg-cover bg-center  py-20 px-8 md:px-24">Loading About Content...</div>;
    }

    if (!pageData || pageData.error) {
        return <div className="min-h-screen bg-cover bg-center  py-20 px-8 md:px-24">Error loading About Content.</div>;
    }


    return (
        <div className="min-h-screen bg-cover bg-center  py-20 px-8 md:px-24" style={{ backgroundImage: "url('/handshake.gif')" }}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="max-w-7xl mx-auto"
            >
                {/* Hero Section */}
                <motion.div variants={itemVariants} className="mb-16">
                    <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center text-blue-700">{pageData.heroSection?.title}</h1> {/* Hero title from JSON */}
                    <p className="text-lg md:text-xl leading-relaxed text-center max-w-2xl mx-auto text-gray-600">
                        {pageData.heroSection?.description} {/* Hero description from JSON */}
                    </p>
                </motion.div>

                {/* Our Story, Mission, Values */}
                <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {/* Our Story */}
                    <motion.div
                        variants={fadeInVariants}
                        className="bg-gradient-to-t  bg-slate-200 rounded-lg p-8 shadow-lg text-center transform transition duration-500 hover:scale-105"
                    >
                        <motion.div
                            variants={continuousAnimationVariants}
                            className="text-4xl text-white mb-4"
                        >
                            <FaMapMarkerAlt />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2  text-blue-600">{pageData.storySection?.title}</h3> {/* Story title from JSON */}
                        <p className="text-lg  text-blue-600">{pageData.storySection?.description}</p> {/* Story description from JSON */}
                    </motion.div>

                    {/* Mission */}
                    <motion.div
                        variants={fadeInVariants}
                        className=" rounded-lg p-8 bg-slate-200 shadow-lg text-center transform transition duration-500 hover:scale-105"
                    >
                        <motion.div
                            variants={continuousAnimationVariants}
                            className="text-4xl  text-blue-600 mb-4"
                        >
                            <FaRegLightbulb />
                        </motion.div>
                        <h3 className="text-xl font-bold mb-2 text-blue-600">{pageData.missionSection?.title}</h3> {/* Mission title from JSON */}
                        <p className="text-lg text-blue-600">{pageData.missionSection?.description}</p> {/* Mission description from JSON */}
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
                        <h3 className="text-xl font-bold mb-2 text-blue-600">{pageData.valuesSection?.title}</h3> {/* Values title from JSON */}
                        <ul className="text-lg text-blue-600">
                            {pageData.valuesSection?.values?.map((value, index) => ( // Values list from JSON
                                <li key={index}>{value}</li>
                            ))}
                        </ul>
                    </motion.div>
                </motion.div>

                {/* Team Cards */}
                <motion.div variants={itemVariants} className="grid  grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
                    {pageData.teamSection?.members?.map((member, index) => ( // Team members from JSON
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
                        <h3 className="text-xl font-bold mb-2 text-blue-600">{pageData.achievementsSection?.title}</h3> {/* Achievements title from JSON */}
                        <p className="text-lg text-blue-600">{pageData.achievementsSection?.description}</p> {/* Achievements description from JSON */}
                    </motion.div>
                </motion.div>

                {/* Call to Action */}
                <motion.div variants={itemVariants} className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4 text-blue-700">{pageData.ctaSection?.title}</h2> {/* CTA title from JSON */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className=" hover:bg-blue-700 text-blue-600 font-bold py-3 px-6 rounded-lg text-lg"
                    >
                        {pageData.ctaSection?.buttonText} {/* CTA button text from JSON */}
                    </motion.button>
                </motion.div>

            </motion.div>
        </div>
    );
};

export default AboutPage;