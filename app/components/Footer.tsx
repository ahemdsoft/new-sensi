'use client';

import Image from 'next/image';
import Link from 'next/link';
import { FaFacebookF, FaInstagram, FaPhone } from 'react-icons/fa';

const Footer = () => {
  const popularCategories = [
    { name: '2D CASES', href: '/phone-cases/2d' },
    { name: '2D MAX CASES', href: '/phone-cases/2d-max' },
    { name: '3D HARD CASES', href: '/phone-cases/3d-hard' },
    { name: 'SOFT CASES', href: '/phone-cases/soft' },
  ];

  const customerServices = [
    { name: 'About Us', href: '/about-us' },
    { name: 'Terms & Conditions', href: '/about-us/terms-conditions' },
    { name: 'FAQ', href: '/about-us/faq' },
    { name: 'Privacy Policy', href: '/about-us/privacy-policy' },
    { name: 'E-waste Policy', href: '/about-us/e-waste-policy' },
    { name: 'Cancellation & Return Policy', href: '/about-us/cancellation-return-policy' },
  ];

  return (
    <footer className="bg-[#2B2D2D] font-[sans-serif] text-white relative overflow-hidden">
      {/* Curved Lines Design */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] pointer-events-none">
        <Image
          src="/image/Group 201.png"
          alt="Decorative curves"
          width={300}
          height={300}
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo and Contact Section */}
          <div className="space-y-6">
            <Link href="/" className="block">
              <Image
                src="/logoo.png"
                alt="Senshi Phone Casings"
                width={150}
                height={50}
                className="h-12 w-auto"
              />
            </Link>
            <div className="space-y-4">
              <h3 className="text-lg font-semibold"><Link href={'/contact-us'}>Contact Us</Link></h3>
              <div className="flex flex-col space-y-2">
                <a 
                  href="https://facebook.com/senshiphonecasings" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <FaFacebookF size={20} />
                  <span>Facebook Page</span>
                </a>
                <a 
                  href="https://instagram.com/senshiphonecasings" 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <FaInstagram size={20} />
                  <span>Instagram</span>
                </a>
                <a 
                  href="tel:+8801234567890" 
                  className="flex items-center space-x-2 hover:text-gray-300 transition-colors"
                >
                  <FaPhone size={20} />
                  <span>Call Us</span>
                </a>
              </div>
            </div>
          </div>

          {/* Popular Categories */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-gray-500 pb-2">
              Most Popular Categories
            </h3>
            <ul className="space-y-2">
              {popularCategories.map((category) => (
                <li key={category.href}>
                  <Link 
                    href={category.href} 
                    className="hover:text-gray-300 transition-colors"
                  >
                    {category.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Customer Services */}
          <div className="space-y-6">
            <h3 className="text-lg font-semibold border-b border-gray-500 pb-2">
              Customer Services
            </h3>
            <ul className="space-y-2">
              {customerServices.map((service) => (
                <li key={service.href}>
                  <Link 
                    href={service.href} 
                    className="hover:text-gray-300 transition-colors"
                  >
                    {service.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Copyright Section */}
        <div className="mt-12 pt-8 border-t border-gray-400 flex flex-col md:flex-row justify-center gap-2 items-center">
          <p className="text-gray-400 text-sm">
            © 2024 All rights reserved Senshi Phone Casings
          </p>
          <Link href="/" className="mt-4 md:mt-0">
            <Image
              src="/logoo.png"
              alt="Senshi Phone Casings"
              width={100}
              height={40}
              className="h-8 w-auto"
            />
          </Link>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 