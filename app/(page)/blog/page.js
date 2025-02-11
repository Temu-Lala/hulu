"use client";
import { motion } from "framer-motion";

import { useState, useEffect, useContext } from "react"; // Import useEffect and useContext
import { FaTiktok, FaYoutube, FaInstagram } from "react-icons/fa";
import { LanguageContext } from '../../contexts/LanguageContext'; // Import LanguageContext

const BlogPage = () => {
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

        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/blog.json`); // Fetch JSON based on language
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

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, [language]); // Re-fetch data when language state from Context changes


    if (loading) {
        return <p>Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p>Error loading content.</p>;
    }


    return (
        <div className="bg-white text-gray-900 py-16 px-6 md:px-24 min-h-screen">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="max-w-6xl mx-auto">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-5xl font-bold text-blue-800">{pageData.pageTitle}</h1> {/* Page title from JSON */}
                    <p className="text-lg text-gray-600 mt-4">{pageData.pageDescription}</p> {/* Page Description from JSON */}
                </div>

                {/* Blog Posts */}
                <div className="space-y-12">
                    {pageData.blogPosts.map((post, index) => ( // Blog posts from JSON
                        <div key={index} className="bg-blue-100 rounded-lg p-8 shadow-lg">
                            <h2 className="text-3xl font-bold text-blue-900">{post.title}</h2> {/* Post title from JSON */}
                            <p className="text-lg text-gray-700 mt-2">{post.description}</p> {/* Post description from JSON */}
                            <div className="flex justify-center my-4">
                                <iframe className="rounded-lg" width="560" height="315" src={post.videoUrl} title={post.title}></iframe> {/* Post video from JSON and title for iframe */}
                            </div>
                            <a href={post.linkUrl} className="text-blue-600 font-semibold">{pageData.readMoreText}</a> {/* "Read More" text from JSON */}
                        </div>
                    ))}
                </div>

                {/* Workshop Section */}
                <div className="mt-16 bg-blue-200 p-8 rounded-lg shadow-lg text-center">
                    <h2 className="text-4xl font-bold text-blue-900">{pageData.workshopTitle}</h2> {/* Workshop title from JSON */}
                    <p className="text-lg text-gray-700 mt-2">{pageData.workshopDescription}</p> {/* Workshop description from JSON */}
                    <div className="flex justify-center mt-4">
                        <iframe className="rounded-lg" width="560" height="315" src={pageData.workshopVideoUrl} title={pageData.workshopTitle}></iframe> {/* Workshop video from JSON and title for iframe */}
                    </div>
                </div>

                {/* Call to Action */}
                <div className="text-center mt-16">
                    <h2 className="text-3xl font-bold text-blue-900">{pageData.callToActionTitle}</h2> {/* Call to action title from JSON */}
                    <p className="text-lg text-gray-700 mt-2">{pageData.callToActionDescription}</p> {/* Call to action description from JSON */}
                    <a href={pageData.subscribeButtonLink} target="_blank" rel="noopener noreferrer"> {/* Subscribe button link from JSON */}
                        <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }} className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg text-lg mt-4">
                            {pageData.subscribeButtonText} {/* Subscribe button text from JSON */}
                        </motion.button>
                    </a>
                </div>
            </motion.div>
        </div>
    );
};

export default BlogPage;
