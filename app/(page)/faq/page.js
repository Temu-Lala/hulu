"use client";


import { useState, useEffect, useContext } from "react"; // Import useContext
import {
    FiChevronDown,
    FiChevronUp,
    FiMapPin,
    FiDollarSign,
    FiRefreshCcw,
    FiBriefcase,
    FiGlobe,
    FiCreditCard,
    FiShield,
    FiCheckCircle,
} from "react-icons/fi";
import { LanguageContext } from '../../contexts/LanguageContext'; // Import LanguageContext


const FAQ = () => {
    const [openIndex, setOpenIndex] = useState(null);
    const [pageData, setPageData] = useState(null); // State for JSON data
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext); // Consume language context


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/faq.json`); // Fetch JSON based on language
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


    const toggleFAQ = (index) => {
        setOpenIndex(openIndex === index ? null : index);
    };


    if (loading) {
        return <p>Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p>Error loading content.</p>;
    }


    return (
        <div className="min-h-screen  flex flex-col items-center justify-center py-10 px-4">
            <h1 className="text-4xl font-extrabold text-blue-700 mb-8 text-center">
                {pageData.pageTitle} {/* Page title from JSON */}
            </h1>
            <div className="flex flex-wrap justify-center gap-6 max-w-6xl">
                {pageData.faqs.map((faq, index) => ( // FAQs from JSON
                    <div
                        key={index}
                        className="bg-white shadow-xl rounded-xl p-6 w-80 transition-transform transform hover:scale-105 flex flex-col items-center text-center"
                    >
                        {/* Icon at the Top */}
                        <div className="mb-3">
                            {(() => { // Render icon dynamically based on iconName from JSON
                                switch (faq.iconName) {
                                    case 'FiBriefcase': return <FiBriefcase className="text-blue-500 text-5xl" />;
                                    case 'FiMapPin': return <FiMapPin className="text-red-500 text-5xl" />;
                                    case 'FiDollarSign': return <FiDollarSign className="text-green-500 text-5xl" />;
                                    case 'FiRefreshCcw': return <FiRefreshCcw className="text-purple-500 text-5xl" />;
                                    case 'FiGlobe': return <FiGlobe className="text-blue-500 text-5xl" />;
                                    case 'FiCreditCard': return <FiCreditCard className="text-yellow-500 text-5xl" />;
                                    case 'FiShield': return <FiShield className="text-gray-500 text-5xl" />;
                                    case 'FiCheckCircle': return <FiCheckCircle className="text-green-500 text-5xl" />;
                                    default: return null; // Or a default icon
                                }
                            })()}
                        </div>

                        {/* Question */}
                        <h3 className="text-lg font-semibold text-blue-700">{faq.question}</h3> {/* FAQ question from JSON */}

                        {/* Expand Button */}
                        <button
                            onClick={() => toggleFAQ(index)}
                            className="mt-3 flex justify-center items-center w-10 h-10 rounded-full bg-blue-100 hover:bg-blue-200 transition"
                        >
                            {openIndex === index ? (
                                <FiChevronUp className="text-blue-700 text-2xl" />
                            ) : (
                                <FiChevronDown className="text-blue-700 text-2xl" />
                            )}
                        </button>

                        {/* Answer (Only Show When Open) */}
                        {openIndex === index && (
                            <p className="mt-3 text-gray-600 text-md leading-relaxed animate-fade-in">
                                {faq.answer} {/* FAQ answer from JSON */}
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default FAQ;
