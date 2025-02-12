"use client";

import { useState, useEffect, useContext, useRef } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

import AboutPage from "./(page)/about/page";
import BlogPage from "./(page)/blog/page";
import ContactPage from "./(page)/contacts/page";
import FAQ from "./(page)/faq/page";
import ServicesPage from "./(page)/services/page";
import Testimonials from "./(page)/testemony/page";
import Footer from "./components/footer/page";
import Navbar from "./components/navbar/page";
import { LanguageContext } from "./contexts/LanguageContext";

const trustedCompanies = [
    "/images/image.png",
    "/images/images2.jpg",
    "/images/image3.jpg",
    "/images/image4.jpg",
    "/images/images5.jpg",
    "/images/images6.png",
    "/images/images7.png",
    "/images/images8.png",
    "/images/images9.png",
    "/images/images10.jpeg",
    "/images/images11.png",
    "/images/images12.png",
    "/images/images13.png",
    "/images/images14.jpg",
    "/images/images17.png",
    "/images/images18.png",
    "/images/images19.png",
    "/images/images20.jpg",
    "/images/images21.png",
];

// Custom Hook for a 1-minute slow counting animation
const useCountAnimation = (targetValue, duration = 60000) => {
    const [count, setCount] = useState(0);
    const startTimeRef = useRef(null);

    useEffect(() => {
        let animationFrameId;

        const animateCounter = (timestamp) => {
            if (!startTimeRef.current) {
                startTimeRef.current = timestamp;
            }

            const elapsed = timestamp - startTimeRef.current;
            const progress = Math.min(elapsed / duration, 1);
            const nextCount = Math.floor(targetValue * progress);

            setCount(nextCount);

            if (progress < 1) {
                animationFrameId = requestAnimationFrame(animateCounter);
            } else {
                setCount(targetValue);
            }
        };

        animationFrameId = requestAnimationFrame(animateCounter);

        return () => cancelAnimationFrame(animationFrameId);
    }, [targetValue, duration]);

    return count;
};

const LandingPage = () => {
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [fetchError, setFetchError] = useState(false);
    const { language } = useContext(LanguageContext);

    // Define target values with a 1-minute duration
    const clients = useCountAnimation(500, 60000);
    const customers = useCountAnimation(50000, 60000);
    const orders = useCountAnimation(100000, 60000);
    const projects = useCountAnimation(34, 60000);

    const formatCount = (count) => count.toLocaleString();

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            setFetchError(false);
            try {
                const response = await fetch(`/content/${language}/index.json`);
                if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

                const jsonData = await response.json();
                setPageData(jsonData);
            } catch (error) {
                console.error("Could not fetch content:", error);
                setFetchError(true);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    if (loading) return <p>Loading content...</p>;

    if (fetchError) {
        return (
            <div className="text-center py-10">
                <p>Error loading content.</p>
                <button onClick={() => window.location.reload()} className="px-4 py-2 bg-blue-500 text-white rounded">
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className="font-sans pt-12">
            <Navbar />

            {/* Hero Section */}
            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between text-white px-6 py-16 bg-opacity-80">
                <div className="w-full lg:w-1/2 space-y-6">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 5 }}
                    >
                        {pageData?.heroSection?.title}
                    </motion.h1>
                    <motion.p
                        className="text-base sm:text-lg"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 5, delay: 0.5 }}
                    >
                        {pageData?.heroSection?.description}
                    </motion.p>
                </div>

                <div className="w-full flex-1 lg:w-1/2 relative mt-12 lg:mt-0">
                    <motion.div
                        className="relative flex flex-col items-center justify-center space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 5, delay: 0.5 }}
                    >
                        <Image src="/hululogo.png" alt="Our Services" width={500} height={500} className="rounded-lg shadow-xl" />
                        <Image src="/huluname.png" alt="Our Services" width={500} height={500} className="rounded-lg shadow-xl" />
                    </motion.div>
                </div>
            </section>

            {/* Impact Section */}
            <section className="py-16 text-center">
                <div className="max-w-screen-xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold mb-6">{pageData?.impactSection?.heading}</h2>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {[
                            { count: clients, label: "Clients" },
                            { count: customers, label: "Customers" },
                            { count: orders, label: "Orders" },
                            { count: projects, label: "Projects" },
                        ].map((item, index) => (
                            <motion.div
                                key={index}
                                className="p-6 rounded-lg shadow-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 10, delay: (index + 1) * 0.5 }}
                            >
                                <p className="text-3xl font-semibold">{formatCount(item.count)}+</p>
                                <p className="text-lg">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Trusted Companies */}
            <section className="py-16">
                <div className="max-w-screen-xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-extrabold mb-6">{pageData?.trustedSection?.heading}</h2>
                    <motion.div className="flex overflow-x-auto pb-4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 10 }}>
                        <div className="flex space-x-6">
                            {trustedCompanies.map((img, index) => (
                                <Image key={index} src={img} alt={`Trusted company ${index + 1}`} width={128} height={64} className="h-16 object-contain" />
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* Other Sections */}
            <AboutPage />
            <ServicesPage />
            <FAQ />
            <Testimonials />
            <ContactPage />
            <BlogPage />
            <Footer />
        </div>
    );
};

export default LandingPage;
