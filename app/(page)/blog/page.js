"use client";
import { motion } from "framer-motion";
import { useState, useEffect, useContext } from "react";
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { LanguageContext } from "../../contexts/LanguageContext";

const BlogPage = () => {
    const [isMobile, setIsMobile] = useState(false);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext);

    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth <= 768);
        window.addEventListener("resize", handleResize);
        handleResize();

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/blog.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
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
        return () => window.removeEventListener("resize", handleResize);
    }, [language]);

    if (loading) return <p className="text-white text-center text-xl">Loading content...</p>;
    if (!pageData || pageData.error) return <p className="text-red-500 text-center text-xl">Error loading content.</p>;

    return (
        <div className="bg-gradient-to-b  text-white py-16 px-6 md:px-24 min-h-screen">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold drop-shadow-lg shadow-white">{pageData.pageTitle}</h1>
                    <p className="text-lg mt-4 text-gray-300">{pageData.pageDescription}</p>
                </div>

                {/* Blog Posts */}
                <div className="space-y-12">
                    {pageData.blogPosts.map((post, index) => (
                        <motion.div 
                            key={index} 
                            className=" p-8 rounded-xl shadow-2xl transition-transform transform hover:scale-105 hover:shadow-white"
                            whileHover={{ scale: 1.05 }}
                        >
                            <h2 className="text-3xl font-bold mb-2">{post.title}</h2>
                            <p className="text-lg  text-white">{post.description}</p>
                            <div className="flex justify-center my-4">
                                <iframe className="rounded-lg shadow-lg" width="560" height="315" src={post.videoUrl} title={post.title}></iframe>
                            </div>
                            <a href={post.linkUrl} className=" text-white font-semibold hover:underline">{pageData.readMoreText}</a>
                        </motion.div>
                    ))}
                </div>

                {/* Workshop Section */}
                <motion.div className="mt-16 p-8 rounded-xl  shadow-lg text-center"
                    whileHover={{ scale: 1.05 }}>
                    <h2 className="text-4xl font-bold drop-shadow-lg">{pageData.workshopTitle}</h2>
                    <p className="text-lg  text-white mt-2">{pageData.workshopDescription}</p>
                    <div className="flex justify-center mt-4">
                        <iframe className="rounded-lg shadow-lg" width="560" height="315" src={pageData.workshopVideoUrl} title={pageData.workshopTitle}></iframe>
                    </div>
                </motion.div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold drop-shadow-lg">{pageData.callToActionTitle}</h2>
                    <p className="text-lg  text-white mt-2">{pageData.callToActionDescription}</p>
                    <a href={pageData.subscribeButtonLink} target="_blank" rel="noopener noreferrer">
                        <motion.button 
                            whileHover={{ scale: 1.1, boxShadow: "0px 4px 20px rgba(0,0,255,0.5)" }} 
                            whileTap={{ scale: 0.95 }} 
                            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mt-4 shadow-lg"
                        >
                            {pageData.subscribeButtonText}
                        </motion.button>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPage;
