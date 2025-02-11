"use client";

import { useState, useEffect, useContext } from "react"; // Import useContext
import { motion } from "framer-motion";
import Image from 'next/image'; // Import Image

import AboutPage from "./(page)/about/page";
import BlogPage from "./(page)/blog/page";
import ContactPage from "./(page)/contacts/page";
import FAQ from "./(page)/faq/page";
import ServicesPage from "./(page)/services/page";
import Testimonials from "./(page)/testemony/page";
import Footer from "./components/footer/page"; // Assuming Footer component path
import Navbar from "./components/navbar/page";
import { LanguageContext } from './contexts/LanguageContext'; // Import LanguageContext


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
    "/images/images8.png",
];

const LandingPage = () => {
    const [clients, setClients] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [orders, setOrders] = useState(0);
    const [projects, setProjects] = useState(0);
    const [pageData, setPageData] = useState(null);
    const [loading, setLoading] = useState(true);
    const { language } = useContext(LanguageContext); // Consume language context


    useEffect(() => {
        const clientCountInterval = setInterval(() => {
            if (clients < 500) setClients((prev) => Math.min(prev + 10, 500)); // Increased target to 500
        }, 50);

        const customerCountInterval = setInterval(() => {
            if (customers < 50000) setCustomers((prev) => Math.min(prev + 1000, 50000));
        }, 30);

        const orderCountInterval = setInterval(() => {
            if (orders < 100000) setOrders((prev) => Math.min(prev + 1000, 100000));
        }, 40);

        const projectCountInterval = setInterval(() => {
            if (projects < 34) setProjects((prev) => Math.min(prev + 1, 34));
        }, 200);

        return () => {
            clearInterval(clientCountInterval);
            clearInterval(customerCountInterval);
            clearInterval(orderCountInterval);
            clearInterval(projectCountInterval);
        };
    }, [clients, customers, orders, projects]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/index.json`);
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


    if (loading) {
        return <p>Loading content...</p>;
    }

    if (!pageData || pageData.error) {
        return <p>Error loading content.</p>;
    }


    return (
        <div className="font-sans text-gray-800 bg-fixed bg-cover pt-12 bg-center" style={{ backgroundImage: "url('/handshake.gif')" }}>
            <Navbar />

            <section className="min-h-screen flex flex-col lg:flex-row items-center justify-between bg-blue-50 px-6 py-16 bg-opacity-80">
                <div className="w-full lg:w-1/2 space-y-6">
                    <motion.h1
                        className="text-4xl md:text-5xl font-extrabold text-blue-700"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1 }}
                    >
                        {pageData.heroSection?.title} {/* Hero section title from JSON - Optional chaining for safety */}
                    </motion.h1>

                    <motion.p
                        className="text-base sm:text-lg text-gray-600"
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        {pageData.heroSection?.description} {/* Hero section description from JSON - Optional chaining for safety */}
                    </motion.p>

                    <motion.div
                        className="space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.4 }}
                    >
                        {/* You can add buttons or other elements here if needed */}
                    </motion.div>
                </div>

                <div className="w-full flex-1 lg:w-1/2 relative mt-12 lg:mt-0">
                    <motion.div
                        className="absolute inset-0 flex flex-col items-center justify-center space-y-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <Image
                            src="/hululogo.png"
                            alt="Our Services"
                            layout="intrinsic"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-xl"
                        />

                        <Image
                            src="/huluname.png"
                            alt="Our Services"
                            layout="intrinsic"
                            width={500}
                            height={500}
                            className="rounded-lg shadow-xl"
                        />
                    </motion.div>
                </div>

            </section>

            <section className="py-16 bg-white text-center">
                <div className="max-w-screen-xl mx-auto px-6">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-6">{pageData.impactSection?.heading}</h2> {/* Impact section heading from JSON - Optional chaining */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
                        {pageData.impactSection?.stats?.map((item, index) => (  // Impact stats from JSON - Optional chaining
                            <motion.div
                                key={index}
                                className="bg-blue-100 p-6 rounded-lg shadow-md"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 1, delay: (index + 1) * 0.2 }}
                            >
                                <p className="text-3xl font-semibold text-blue-700">{item.count}+ </p>
                                <p className="text-lg text-gray-600">{item.label}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-16 bg-blue-50">
                <div className="max-w-screen-xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-extrabold text-blue-700 mb-6">{pageData.trustedSection?.heading}</h2> {/* Trusted section heading from JSON - Optional chaining */}
                    <motion.div
                        className="flex overflow-x-auto pb-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.div
                            className="flex space-x-6"
                            animate={{ x: "-100%" }}
                            transition={{
                                duration: 20,
                                repeat: Infinity,
                                repeatType: "loop",
                                ease: "linear",
                            }}
                        >
                            {trustedCompanies.map((images, index) => (
                                <div key={index} className="w-32 flex-shrink-0">
                                    <img src={images} alt={`Trusted company ${index + 1}`} className="h-16 object-contain" />
                                </div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </section>

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