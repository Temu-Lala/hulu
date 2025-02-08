"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";
import Navbar from "./components/navbar/page";
import Footer from "./components/footer/page";
import AboutPage from "./(page)/about/page";
import BlogPage from "./(page)/blog/page";
import Contact from "./(page)/contacts/page";
import FAQ from "./(page)/faq/page";
import Services from "./(page)/service/page";
import Testimonials from "./(page)/testemony/page";

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

  useEffect(() => {
    const clientCountInterval = setInterval(() => {
      if (clients < 200) setClients((prev) => Math.min(prev + 5, 500));
    }, 50);

    const customerCountInterval = setInterval(() => {
      if (customers < 50000) setCustomers((prev) => Math.min(prev + 50, 50000));
    }, 30);

    const orderCountInterval = setInterval(() => {
      if (orders < 100000) setOrders((prev) => Math.min(prev + 10, 100000));
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
            Hulu General Commissions
          </motion.h1>

          <motion.p
            className="text-base sm:text-lg text-gray-600"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            We work to connect job seekers with employers, boost your brand’s visibility, facilitate secure transactions, expand your business internationally, offer expert business advice, provide skilled manpower, help with real estate and vehicle deals, manage your social media presence, develop custom software and apps, and create high-impact advertising materials for your business.</motion.p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.4 }}
          >
         
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
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Our Impact</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12">
            {[{ count: clients, label: "Clients" }, { count: customers, label: "Customers" }, { count: orders, label: "Orders Processed" }, { count: projects, label: "Projects Delivered" }].map((item, index) => (
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
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6">Trusted by Leading Companies</h2>
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
      <Services />
      <FAQ />
      <Testimonials />
      <Contact />
      <BlogPage />
      <Footer />
    </div>
  );
};

export default LandingPage;
