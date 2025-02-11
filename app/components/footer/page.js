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
                        <h1 className="text-3xl font-semibold t">{pageData.companyName}</h1> {/* Company Name from JSON */}
                    </div>
                </div>

                {/* Social Icons */}
                <div className="flex justify-center space-x-8 mb-8">
                    {pageData.socialLinks.map((social, index) => ( // Social Links from JSON
                        <motion.a
                            key={index}
                            href={social.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-16 h-16 flex items-center justify-center bg-white text-blue-600 rounded-full shadow-lg transform hover:scale-110 transition-all duration-300"
                            whileHover={{ y: -5 }}
                        >
                            {(() => { // Render icon dynamically based on iconName from JSON
                                switch (social.iconName) {
                                    case 'FaTiktok': return <FaTiktok className="text-3xl hover:text-black" />;
                                    case 'FaFacebook': return <FaFacebook className="text-3xl hover:text-blue-600" />;
                                    case 'FaTelegram': return <FaTelegram className="text-3xl hover:text-blue-600" />;
                                    case 'FaYoutube': return <FaYoutube className="text-3xl hover:text-red-600" />;
                                    case 'FaInstagram': return <FaInstagram className="text-3xl hover:text-pink-600" />;
                                    case 'FaTwitter': return <FaTwitter className="text-3xl hover:text-blue-500" />;
                                    default: return null; // Or a default icon
                                }
                            })()}
                        </motion.a>
                    ))}
                </div>

                {/* Contact Information */}
                <div className="mb-8 text-center sm:text-left">
                    <h3 className="text-lg font-semibold mb-2">{pageData.contactUsTitle}</h3> {/* "Contact Us" title from JSON */}
                    <p>Email: {pageData.contactEmail}</p> {/* Contact Email from JSON */}
                    <div className="flex justify-center space-x-8 mt-4">
                        {pageData.phoneNumbers.map((phone, index) => ( // Phone Numbers from JSON
                            <motion.a
                                key={index}
                                href={`tel:${phone.number}`}
                                className="w-16 h-16 flex items-center justify-center bg-blue-500 text-white rounded-full shadow-lg transform scale-110 transition-all duration-300"
                                animate={{ rotate: [0, 3, -3, 0] }}
                                transition={{ repeat: Infinity, duration: 0.5 }}
                            >
                                <FaPhoneAlt className="text-3xl" />
                                <span className="text-xs">{phone.label}</span> {/* Phone label from JSON */}
                            </motion.a>
                        ))}
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center text-sm opacity-70">
                    &copy; {new Date().getFullYear()} {pageData.copyrightText}. {pageData.rightsReservedText} {/* Copyright and rights reserved text from JSON */}
                </div>
            </div>
        </footer>
    );
}
