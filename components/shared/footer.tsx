import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-stone-50 to-stone-100 dark:from-stone-800 dark:to-stone-900 text-gray-300 py-8">
      <div className="container mx-auto px-6 flex flex-col md:flex-row items-center justify-between">
        <p className="text-sm text-gray-400">&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
        
        <div className="flex space-x-6 mt-4 md:mt-0">
          <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
            <FaTwitter className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
            <FaLinkedin className="w-5 h-5" />
          </a>
          <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
            <FaGithub className="w-5 h-5" />
          </a>
        </div>
      </div>
    </footer>
  );
}