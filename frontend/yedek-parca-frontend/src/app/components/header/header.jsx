"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import navLinks from "@/helpers/data/navLinks"; 

const Header = () => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);

  return (
    <header className="bg-blue-600 text-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-3 flex justify-between items-center">
        {/* LOGO */}
        <h1
          className="text-2xl font-bold cursor-pointer"
          onClick={() => router.push("/")}
        >
          Plasiyer Paneli
        </h1>

        {/* HAMBURGER MENU ICON */}
        <button
          className="lg:hidden text-2xl focus:outline-none"
          onClick={toggleMenu}
        >
          {isOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* NAVIGATION LINKS */}
        <nav
          className={`${
            isOpen ? "block" : "hidden"
          } lg:flex lg:items-center lg:space-x-6 absolute lg:static top-16 left-0 w-full lg:w-auto bg-blue-600 lg:bg-transparent transition-all duration-300`}
        >
          {navLinks.map((link) => (
            <Link
              key={link.name}
              href={link.path}
              className="block px-4 py-2 hover:bg-blue-500 rounded-md transition-colors"
              onClick={() => setIsOpen(false)} // Menüden seçim sonrası kapatır
            >
              {link.name}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
