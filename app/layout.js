"use client";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({ children }) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 4000); // Increased loading time to 4 seconds
  }, []);

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {loading ? (
          <motion.div
            className="flex flex-col items-center justify-center h-screen bg-white"
            initial={{ opacity: 1 }}
            animate={{ opacity: 0 }}
            transition={{ duration: 1, delay: 3 }}
            exit={{ opacity: 0 }}
          >
            {/* Top Image (Rotating & Bouncing) */}
            <motion.img
              src="/hululogo.png"
              alt="HULU Logo"
              className="w-36 h-36 mb-2"
              animate={{ rotate: [0, 360], y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
            />

            {/* Bottom Image (Bouncing) */}
            <motion.img
              src="/huluname.png"
              alt="HULU Name"
              className="w-40 h-40"
              animate={{ y: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
            />

            {/* Loading Text */}
            <motion.p
              className="mt-4 text-lg font-semibold text-gray-700"
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ repeat: Infinity, duration: 1 }}
            >
              Loading... ⏳
            </motion.p>
          </motion.div>
        ) : (
          children
        )}
      </body>
    </html>
  );
}
