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
        <header className="fixed top-0 left-0 w-full text-white backdrop-blur-md shadow-md z-50">
            <div className="container mx-auto px-6 py-4 flex justify-between items-center">
                <Link href="/" className="flex items-center space-x-3">
                    <Image src="/hululogo.png" alt="Logo" width={50} height={50} />
                    <Image src="/huluname.png" alt="Logo Name" width={120} height={50} />
                </Link>

                <nav className="hidden md:flex space-x-6 items-center">
                    {Object.entries(navbarData.links).map(([key, value]) => (
                        <Link key={key} href={`/${key}`} className="text-white hover:text-gray-300 transition-colors duration-300">{value}</Link>
                    ))}
                    <div className="relative" ref={dropdownRef}>
                        <button onClick={toggleLanguageDropdown} className="flex items-center text-white hover:text-gray-300 transition-colors duration-300 focus:outline-none">
                            {language === 'en' ? 'English' : 'Amharic'}
                            <MdArrowDropDown className="inline-block ml-1 text-xl" />
                        </button>
                        {isLanguageDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-24 rounded-md shadow-lg ring-1 ring-opacity-5 focus:outline-none" tabIndex="-1" role="menu">
                                <div className="py-1" role="menuitem">
                                    <button onClick={() => { switchLanguage('en'); closeLanguageDropdown(); }} className="block px-4 py-2 text-sm text-white  w-full text-left">English</button>
                                    <button onClick={() => { switchLanguage('am'); closeLanguageDropdown(); }} className="block px-4 py-2 text-sm text-white  w-full text-left">Amharic</button>
                                </div>
                            </div>
                        )}
                    </div>
                </nav>

                <button className="md:hidden focus:outline-none" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <Close fontSize="large" className="text-white" /> : <Menu fontSize="large" className="text-white" />}
                </button>
            </div>

            {isOpen && (
                <nav className="md:hidden p-4 space-y-3 text-center shadow-lg  ">
                    {Object.entries(navbarData.links).map(([key, value]) => (
                        <Link key={key} href={`/${key}`} className="block text-white hover:text-gray-300 transition-colors duration-300" onClick={() => setIsOpen(false)}>{value}</Link>
                    ))}
                    <div className="flex justify-center space-x-2 mt-4">
                        <button onClick={() => switchLanguage('en')} className={`px-3 py-1 rounded-md ${language === 'en' ? 'bg-blue-600 text-white' : 'text-white hover:bg-blue-700'}`}>English</button>
                        <button onClick={() => switchLanguage('am')} className={`px-3 py-1 rounded-md ${language === 'am' ? 'bg-blue-600 text-white' : 'text-white hover:bg-blue-700'}`}>Amharic</button>
                    </div>
                </nav>
            )}
        </header>
    );
}
