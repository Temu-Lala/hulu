"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, Close } from "@mui/icons-material";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 w-full bg-white/30 backdrop-blur-md shadow-md z-50">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="flex items-center space-x-3">
          <Image src="/hululogo.png" alt="Logo" width={50} height={50} />
          <Image src="/huluname.png" alt="Logo Name" width={120} height={50} />
        </div>

        {/* Desktop Menu */}
        <nav className="hidden md:flex space-x-6">
          <Link href="/about" className="text-blue-600 hover:text-gray-300">About</Link>
          <Link href="/blog" className="text-blue-600 hover:text-gray-300">Blog</Link>
          <Link href="/services" className="text-blue-600 hover:text-gray-300">Services</Link>
          <Link href="/testemony" className="text-blue-600 hover:text-gray-300">Testimony</Link>
          <Link href="/faq" className="text-blue-600 hover:text-gray-300">FAQ</Link>
          <Link href="/contacts" className="text-blue-600 hover:text-gray-300">Contact</Link>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <Close fontSize="large" /> : <Menu fontSize="large" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <nav className="md:hidden bg-white p-4 space-y-3 text-center shadow-lg">
          <Link href="/about" className="block text-black hover:text-gray-500" onClick={() => setIsOpen(false)}>About</Link>
          <Link href="/blog" className="block text-black hover:text-gray-500" onClick={() => setIsOpen(false)}>Blog</Link>
          <Link href="/service" className="block text-black hover:text-gray-500" onClick={() => setIsOpen(false)}>Services</Link>
          <Link href="/testemony" className="block text-black hover:text-gray-500" onClick={() => setIsOpen(false)}>Testimony</Link>
          <Link href="/faq" className="block text-black hover:text-gray-500" onClick={() => setIsOpen(false)}>FAQ</Link>
          <Link href="/contacts" className="block text-black hover:text-gray-500" onClick={() => setIsOpen(false)}>Contact</Link>
        </nav>
      )}
    </header>
  );
}
