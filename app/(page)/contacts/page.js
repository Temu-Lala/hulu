"use client";

import { useState, useContext, useEffect } from "react";
import { motion } from "framer-motion";
import { LanguageContext } from "../../contexts/LanguageContext";

const ContactPage = () => {
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/contacts.json`);
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

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Email:", email);
        console.log("Message:", message);
        alert("Form submission is simulated. Check console for data.");
    };

    if (loading) {
        return <p className="text-center text-xl font-semibold">Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p className="text-center text-xl text-red-500">Error loading content.</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4  text-white">
            {/* Header */}
            <motion.div 
                className="text-center mb-12" 
                initial={{ opacity: 0, y: -30 }} 
                animate={{ opacity: 1, y: 0 }} 
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-5xl font-extrabold drop-shadow-lg mb-4">{pageData.pageTitle}</h1>
                <p className="text-lg max-w-md mx-auto opacity-80">{pageData.pageDescription}</p>
            </motion.div>

            {/* Contact Container */}
            <motion.div 
                className="max-w-screen-lg w-full flex flex-col md:flex-row  bg-opacity-80 backdrop-blur-lg shadow-2xl rounded-2xl overflow-hidden md:space-x-8 p-8"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Left Side: Contact Form */}
                <div className="w-full md:w-1/2">
                    <h2 className="text-3xl font-semibold mb-6">{pageData.formTitle}</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium mb-2">{pageData.emailLabel}</label>
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-1 rounded-md  border  focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-transform transform hover:scale-105"
                                placeholder="Your Email"
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium mb-2">{pageData.messageLabel}</label>
                            <textarea
                                id="message"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 mt-1 rounded-md  border  focus:ring-2 focus:ring-blue-400 focus:border-blue-300 transition-transform transform hover:scale-105"
                                rows={5}
                                placeholder="Your Message"
                            />
                        </div>
                        <motion.button
                            type="submit"
                            whileHover={{ scale: 1.1 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-full mt-6 p-3  text-white font-bold rounded-md transition-all duration-300 shadow-lg hover:bg-blue-700 focus:shadow-xl"
                        >
                            {pageData.submitButtonText}
                        </motion.button>
                    </form>
                </div>

                {/* Right Side: Map */}
                <motion.div 
                    className="w-full md:w-1/2"
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <iframe
                        src={pageData.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        className="w-full h-[450px] md:h-full border-0 rounded-r-2xl shadow-lg"
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                    ></iframe>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default ContactPage;
