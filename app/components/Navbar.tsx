'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import axios from 'axios';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import CartOption from './cartOptions';
import FadeIn from './animation/fadein';
const navItems = [
  { name: 'HOME', href: '/' },
  { name: 'PHONE CASES', href: '/phone-cases' },
  { name: 'DESIGN COLLECTION', href: '/desgine-collection' },
  { name: 'CUSTOMIZATION', href: '/customization' },
  { name: 'POP HOLDER', href: '/pop-holder' },
  { name: 'ABOUT US', href: '/about-us' },
  { name: 'CONTACT US', href: '/contact-us' },
];

const phoneCaseItems = [
  { name: '2D Case', href: '/phone-cases/2d' },
  { name: '2D Max Case', href: '/phone-cases/2d-max' },
  { name: 'Soft Case', href: '/phone-cases/soft' },
  { name: '3D Case', href: '/phone-cases/3d-hard' },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [phoneCasesOpen, setPhoneCasesOpen] = useState(false);

  // ✅ Use isSearching to avoid lint warning
  useEffect(() => {
    console.log('Searching status:', isSearching);
  }, [isSearching]);
  const handleSearch = async () => {
    if (!searchQuery.trim()) return;
    
    try {
      setIsSearching(true);
      window.location.href = `/desgine-collection/${searchQuery}`;
      const response = await axios.get(''); // Add real endpoint
      console.log('Search response:', response.data);
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setIsSearching(false);
      setSearchQuery('');
      setSearchOpen(false);
    }
  };

  const handleSearchKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const togglePhoneCases = () => {
    setPhoneCasesOpen(!phoneCasesOpen);
  };

  return (
    <div className="w-screen flex flex-col">
      <div className="bg-[#4372C1] text-white text-center py-1.5">
        <p>ALL MODELS AVAILABLE 🔥 🎉</p>
      </div>

      <nav className="bg-black text-white pt-2 pb-3 relative z-20">
        <div className="max-w-7xl mx-auto px-4 flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <button onClick={() => setMenuOpen(!menuOpen)} className="p-2 md:hidden">
              <svg className="w-6 h-6" stroke="currentColor" fill="white" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>

            <div className="hidden md:flex items-center relative">
  <button
    onClick={() => setSearchOpen(!searchOpen)}
    className="p-2 hover:bg-gray-600 rounded-full cursor-pointer transition-colors"
  >
    <MagnifyingGlassIcon className="h-6 w-6 text-white" />
  </button>

  <div
    className={`absolute left-12 transition-all duration-300 ease-in-out ${
      searchOpen ? 'opacity-100 scale-100 w-64' : 'opacity-0 scale-95 w-0'
    } overflow-hidden`}
  >
    <input
      type="text"
      placeholder="Search products..."
      value={searchQuery}
      
      onChange={(e) => setSearchQuery(e.target.value)}
      onKeyDown={handleSearchKeyPress}
      className="p-2 pl-4 pr-4 border border-gray-800 rounded-xl shadow-sm w-full focus:outline-none focus:ring-2 focus:ring-blue-400 bg-gray-600 text-sm transition-all"
    />
  </div>
</div>

          </div>

          <Link href="/" className="flex-shrink-0">
            <Image src="/logoo.png" alt="Logo" width={150} height={40} priority />
          </Link>

          <div className="flex items-center space-x-3">
            <button className="p-2 cursor-pointer hover:bg-gray-600 rounded-full transition-colors">
              <Link href="/auth">
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </Link>
            </button>
            <button className="p-2 cursor-pointer  hover:bg-gray-600 rounded-full transition-colors sm:block hidden">
              <Link href="/">
                <svg className="w-6 h-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </Link>
            </button>
            <CartOption/>
          </div>
        </div>
      </nav>

      <nav className="bg-black relative z-10">
        <div className="hidden md:flex justify-center font-sans font-extralight text-white text-base space-x-6 py-4">
          {navItems.map((item) => {
            if (item.name === 'PHONE CASES') {
              return (
                <div key={item.href} className="relative group">
                  <button className="flex items-center gap-1 hover:text-[#4372C1] transition-all duration-700">
                    {item.name}
                    <ChevronDownIcon className="w-4 h-4" />
                  </button>
                  <div className="absolute bg-white text-black rounded shadow-lg mt-2 w-48 z-10 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-700">
                    <ul>
                      {phoneCaseItems.map((subItem) => (
                        <li key={subItem.href}>
                          <Link href={subItem.href} className="block px-4 py-2 hover:bg-gray-100">
                            {subItem.name}
                          </Link>
                        </li>
                      ))}
                      
                    </ul>
                  </div>
                </div>
              );
            }

            return (
              <Link
                key={item.href}
                href={item.href}
                className="hover:text-[#4372C1] transition-all duration-300"
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        {menuOpen && (
  <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-start px-6 py-4 space-y-2 md:hidden z-50">

    {/* 🔍 Mobile Search */}
    <div className="w-full mb-4">
      <div className="flex items-center space-x-2">
        <MagnifyingGlassIcon className="h-5 w-5 text-white" />
        <input
          type="text"
          placeholder="Search products..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          onKeyDown={handleSearchKeyPress}
          className="w-full bg-gray-700 text-white px-3 py-1 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 text-sm"
        />
      </div>
    </div>


    {/* Mobile Navigation Items */}
    {navItems.map((item) => {
      if (item.name === 'PHONE CASES') {
        return (
          <div key={item.href} className="w-full">
            <button 
              onClick={togglePhoneCases}
              className="w-full py-2 border-b border-gray-700 flex z-20 m-1 justify-between cursor-pointer items-center"
            >
              {item.name}
              <ChevronDownIcon className={`w-4 h-4 transition-transform ${phoneCasesOpen ? 'rotate-180' : ''}`} />
            </button>
            {phoneCasesOpen && (
              <div className="pl-4 py-2 m-1 space-y-2">
                {phoneCaseItems.map((subItem) => (
                  <Link 
                    key={subItem.href} 
                    href={subItem.href} 
                    className="block py-2 border-b border-gray-700"
                    onClick={() => setMenuOpen(false)}
                  >
                    {subItem.name}
                  </Link>
                ))}
              </div>
            )}
          </div>
        );
      }

      return (
        <Link 
          key={item.href} 
          href={item.href} 
          className="w-full py-2 border-b border-gray-700"
          onClick={() => setMenuOpen(false)}
        >
          {item.name}
        </Link>
      );
    })}<FadeIn delay={0.3}>
    <div className="absolute top-16 left-0 w-full bg-black text-white flex flex-col items-start px-6 py-4 space-y-2 md:hidden z-50">
      {/* mobile menu content here */}
    </div>
  </FadeIn>
  </div>
)}

      </nav>
    </div>
  );
}
