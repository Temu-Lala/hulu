"use client";

import { useState, useContext, useEffect, useRef } from "react"; // Import useRef
import Link from "next/link";
import Image from "next/image";
import { Menu, Close } from "@mui/icons-material";
import { LanguageContext } from '../../contexts/LanguageContext';
import { MdArrowDropDown } from 'react-icons/md'; // Import React Icon

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const { switchLanguage, language } = useContext(LanguageContext);
    const [navbarData, setNavbarData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false); // State for dropdown
    const dropdownRef = useRef(null); // Ref for dropdown container


    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const response = await fetch(`/content/${language}/navbar.json`);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const jsonData = await response.json();
                setNavbarData(jsonData);
            } catch (error) {
                console.error("Could not fetch navbar content:", error);
                setNavbarData({ error: "Failed to load navbar content." });
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [language]);

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsLanguageDropdownOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);


    const toggleLanguageDropdown = () => {
        setIsLanguageDropdownOpen(!isLanguageDropdownOpen);
    };

    const closeLanguageDropdown = () => {
        setIsLanguageDropdownOpen(false);
    };


    if (loading) {
        return <header>Loading Navbar...</header>;
    }

    if (!navbarData || navbarData.error) {
        return <header>Error loading Navbar.</header>;
    }

    return (
        <header className="fixed top-0 left-0 w-full  backdrop-blur-md shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                {/* Logo */}
                <Link href="/" className="flex items-center space-x-3">
                    <Image src="/hululogo.png" alt="Logo" width={50} height={50} />
                    <Image src="/huluname.png" alt="Logo Name" width={120} height={50} />
                </Link>

                {/* Desktop Menu */}
                <nav className="hidden md:flex space-x-6 items-center">
                    <Link href="/about" className=" hover:text-blue-800 transition-colors duration-300">{navbarData.links.about}</Link>
                    <Link href="/blog" className=" hover:text-blue-800 transition-colors duration-300">{navbarData.links.blog}</Link>
                    <Link href="/services" className=" hover:text-blue-800 transition-colors duration-300">{navbarData.links.services}</Link>
                    <Link href="/testemony" className=" hover:text-blue-800 transition-colors duration-300">{navbarData.links.testimony}</Link>
                    <Link href="/faq" className=" hover:text-blue-800 transition-colors duration-300">{navbarData.links.faq}</Link>
                    <Link href="/contacts" className=" hover:text-blue-800 transition-colors duration-300">{navbarData.links.contact}</Link>

                    {/* Language Dropdown */}
                    <div className="relative" ref={dropdownRef}>
                        <button
                            onClick={toggleLanguageDropdown}
                            className="flex items-center  hover:text-blue-800 transition-colors duration-300 focus:outline-none"
                        >
                            {language === 'en' ? 'English' : 'Amharic'}
                            <MdArrowDropDown className="inline-block ml-1 text-xl" />
                        </button>

                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none" tabIndex="-1" role="menu" aria-orientation="vertical" aria-labelledby="lang-switcher-button">
                                <div className="py-1" role="menuitem">
                                    <button
                                        onClick={() => { switchLanguage('en'); closeLanguageDropdown(); }}
                                        className="block px-4 py-2 text-sm   hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem"
                                    >
                                        English
                                    </button>
                                    <button
                                        onClick={() => { switchLanguage('am'); closeLanguageDropdown(); }}
                                        className="block px-4 py-2 text-sm   hover:bg-gray-100 hover:text-gray-900 w-full text-left" role="menuitem"
                                    >
                                        Amharic
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                {/* Mobile Menu Button */}
                <button className="md:hidden  focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <Close fontSize="large" className="" /> : <Menu fontSize="large" className="text-blue-600" />}
                </button>
            </div>

            {/* Mobile Menu */}
            {isOpen && (
                <nav className="md:hidden   p-4 space-y-3 text-center shadow-lg">
                    <Link href="/about" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300" onClick={() => setIsOpen(false)}>{navbarData.links.about}</Link>
                    <Link href="/blog" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300" onClick={() => setIsOpen(false)}>{navbarData.links.blog}</Link>
                    <Link href="/services" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300" onClick={() => setIsOpen(false)}>{navbarData.links.services}</Link>
                    <Link href="/testemony" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300" onClick={() => setIsOpen(false)}>{navbarData.links.testimony}</Link>
                    <Link href="/faq" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300" onClick={() => setIsOpen(false)}>{navbarData.links.faq}</Link>
                    <Link href="/contacts" className="block text-blue-600 hover:text-blue-800 transition-colors duration-300" onClick={() => setIsOpen(false)}>{navbarData.links.contact}</Link>

                    {/* Mobile Language Switcher - Dropdown Style - can keep buttons for mobile if dropdown is too complex */}
                    <div className="flex justify-center space-x-2 mt-4">
                        <button
                            onClick={() => switchLanguage('en')}
                            className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-blue-600 ' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                            English
                        </button>
                        <button
                            onClick={() => switchLanguage('am')}
                            className={`px-3 py-1 rounded-md ${language === 'am' ? 'bg-blue-600 text-white' : 'text-blue-600 hover:bg-blue-100'}`}
                        >
                            Amharic
                        </button>
                    </div>
                </nav>
            )}
        </header>
    );
}
