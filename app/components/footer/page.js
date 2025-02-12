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
import { useState, useEffect, useContext } from "react"; // Import useEffect and useContext
import { LanguageContext } from '../../contexts/LanguageContext'; // Import LanguageContext

export default function Footer() {
    const [pageData, setPageData] = useState(null); // State for JSON data
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext); // Consume language context

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/footer.json`); // Fetch JSON based on language
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
        <footer className="py-12 mt-16">
            <div className="container mx-auto px-6">
                {/* Company Logo and Name */}
                <div className="flex justify-between items-center mb-8">
                    <div className="flex items-center">
                        {/* Company Logo */}
                        <motion.img
                            src="/hululogo.png"
                            alt="Company Logo"
                            className="w-16 h-16 mr-4 shadow-lg"
                            whileHover={{
                                scale: 1.1,
                                rotate: [0, 5, -5, 0],
                                transition: { duration: 0.5, repeat: Infinity },
                            }}
                        />
                        {/* Company Name */}
                        <motion.h1
                            className="text-3xl font-semibold"
                            whileHover={{ scale: 1.05 }}
                        >
                            {pageData.companyName}
                        </motion.h1>
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-8 mb-8">
                    {pageData.socialLinks.map((social, index) => (
                        <motion.a
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 flex items-center justify-center bg-transparent rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                            whileHover={{
                                y: -5,
                                rotate: [0, 3, -3, 0],
                                scale: 1.1,
                            }}
                            animate={{
                                scale: [1, 1.1, 1],
                                rotate: [0, 5, -5, 0],
                                opacity: [1, 0.8, 1],
                            }}
                            transition={{
                                repeat: Infinity,
                                duration: 0.5,
                            }}
                        >
                            {(() => {
                                switch (social.iconName) {
                                    case 'FaTiktok':
                                        return <FaTiktok className="text-3xl hover:text-black animate-pulse" />;
                                    case 'FaFacebook':
                                        return <FaFacebook className="text-3xl hover:text-blue-600 animate-pulse" />;
                                    case 'FaTelegram':
                                        return <FaTelegram className="text-3xl hover:text-blue-600 animate-pulse" />;
                                    case 'FaYoutube':
                                        return <FaYoutube className="text-3xl hover:text-red-600 animate-pulse" />;
                                    case 'FaInstagram':
                                        return <FaInstagram className="text-3xl hover:text-pink-600 animate-pulse" />;
                                    case 'FaTwitter':
                                        return <FaTwitter className="text-3xl hover:text-blue-500 animate-pulse" />;
                                    default:
                                        return null;
                                }
                            })()}
                        </motion.a>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="mb-8 text-center sm:text-left">
                    <h3 className="text-lg font-semibold mb-2">{pageData.contactUsTitle}</h3>
                    <p>Email: {pageData.contactEmail}</p>
                    <div className="flex justify-center space-x-8 mt-4">
                        {pageData.phoneNumbers.map((phone, index) => (
                            <motion.a
                                key={index}
                                href={`tel:${phone.number}`}
                                className="w-16 h-16 flex items-center justify-center bg-transparent rounded-full shadow-lg transform scale-110 transition-all duration-300"
                                animate={{
                                    rotate: [0, 3, -3, 0],
                                    scale: [1, 1.1, 1],
                                    opacity: [1, 0.8, 1],
                                }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 0.5,
                                }}
                            >
                                <FaPhoneAlt className="text-3xl" />
                                <span className="text-xs">{phone.label}</span>
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center text-sm opacity-70">
                    &copy; {new Date().getFullYear()} {pageData.copyrightText}. {pageData.rightsReservedText}
                </div>
            </div>
        </footer>
    );
}
