"use client";


import { useState, useContext, useEffect } from "react";
import { LanguageContext } from '../../contexts/LanguageContext';

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
        return <p className="text-center">Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p className="text-center">Error loading content.</p>;
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center py-10 px-4 bg-gray-50"> {/* Added bg-gray-50 for subtle background */}
            {/* Header */}
            <div className="text-center mb-12"> {/* Increased mb for more space */}
                <h1 className="text-4xl font-extrabold text-blue-700 mb-4">{pageData.pageTitle}</h1> {/* Reduced mb here */}
                <p className="text-lg text-gray-700 max-w-md mx-auto">{pageData.pageDescription}</p> {/* Improved text color and max-width for better readability */}
            </div>

            {/* Contact Container */}
            <div className="max-w-screen-lg w-full flex flex-col md:flex-row bg-white shadow-xl rounded-2xl overflow-hidden md:space-x-8"> {/* Increased shadow, rounded corners, and horizontal spacing */}

                {/* Left Side: Contact Form */}
                <div className="w-full md:w-1/2 p-8 md:p-10 bg-blue-100 text-blue-800"> {/* Softened blue background and text color */}
                    <h2 className="text-2xl font-semibold mb-8">{pageData.formTitle}</h2> {/* Increased mb */}
                    <form onSubmit={handleSubmit} className="space-y-6"> {/* Increased space-y */}
                        <div>
                            <label htmlFor="email" className="block text-lg font-medium mb-2">{pageData.emailLabel}</label> {/* Added mb to label */}
                            <input
                                id="email"
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full p-3 mt-1 rounded-md bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300" /* Refined input styling */
                                placeholder="Your Email" /* Added placeholder */
                            />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-lg font-medium mb-2">{pageData.messageLabel}</label> {/* Added mb to label */}
                            <textarea
                                id="message"
                                required
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                className="w-full p-3 mt-1 rounded-md bg-white text-black border border-gray-300 focus:ring-2 focus:ring-blue-200 focus:border-blue-300" /* Refined textarea styling */
                                rows={5} /* Increased rows for message */
                                placeholder="Your Message" /* Added placeholder */
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-6 p-3 bg-blue-700 text-white font-bold rounded-md hover:bg-blue-800 transition duration-300 shadow-md focus:shadow-lg" /* Refined button styling with hover and focus effects */
                        >
                            {pageData.submitButtonText}
                        </button>
                    </form>
                </div>

                {/* Right Side: Map */}
                <div className="w-full md:w-1/2 bg-gray-100">
                    <iframe
                        src={pageData.mapEmbedUrl}
                        width="100%"
                        height="100%"
                        className="w-full h-[450px] md:h-full border-0 rounded-r-2xl" /* Increased map height and rounded corner */
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        style={{ borderRadius: '0 0 1rem 0' }} /* Ensure rounded-r-2xl is applied if needed */
                    ></iframe>
                </div>
            </div>
        </div>
    );
};

export default ContactPage;
