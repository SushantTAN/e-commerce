
'use client';

import React from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

const Footer: React.FC = () => {
  const pathname = usePathname();
  const noFooterPaths = ['/login', '/register'];

  if (noFooterPaths.includes(pathname)) {
    return null;
  }

  return (
    <footer className="bg-gray-800 text-white py-8 mt-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">E-commerce App</h3>
            <p className="text-sm">
              123 E-commerce Street, Suite 456<br />
              City, State 12345<br />
              Country
            </p>
            <p className="text-sm mt-2">
              Email: info@ecommerceapp.com<br />
              Phone: (123) 456-7890
            </p>
          </div>

          {/* Quick Links */}
          <div className='text-left md:text-center'>
            <h3 className="text-2xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm hover:text-gray-400">Home</Link></li>
              <li><Link href="/products" className="text-sm hover:text-gray-400">Products</Link></li>
              <li><Link href="/about" className="text-sm hover:text-gray-400">About Us</Link></li>
              <li><Link href="/contact" className="text-sm hover:text-gray-400">Contact Us</Link></li>
            </ul>
          </div>

          {/* Follow Us / Social Media (Placeholder) */}
          <div>
            <h3 className="text-2xl font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              {/* Replace with actual social media icons/links */}
              <a href="#" className="text-sm hover:text-gray-400">Facebook</a>
              <a href="#" className="text-sm hover:text-gray-400">Twitter</a>
              <a href="#" className="text-sm hover:text-gray-400">Instagram</a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-4 text-center">
          <p className="text-sm">&copy; {new Date().getFullYear()} E-commerce App. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
