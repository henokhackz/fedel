import React from 'react';
import { FaTwitter, FaLinkedin, FaGithub } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-stone-800 to-stone-400 dark:from-stone-800 dark:to-stone-900 text-stone-300 py-12">
      <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* App Info */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Fedel AI</h3>
          <p className="text-sm text-gray-400">
            The smart way to enhance language learning through subtitles.
          </p>
        </div>

        {/* Navigation Links */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Explore</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Features
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Lessons
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Blog
              </a>
            </li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Support</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                FAQs
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Contact Support
              </a>
            </li>
            <li>
              <a href="#" className="hover:text-white transition-colors">
                Community Forum
              </a>
            </li>
          </ul>
        </div>

        {/* Contact & Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-gray-100 mb-4">Get in Touch</h3>
          <p className="text-sm text-gray-400 mb-4">
            Email: support@fedelai.com
          </p>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white transition-colors" aria-label="Twitter">
              <FaTwitter className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="LinkedIn">
              <FaLinkedin className="w-6 h-6" />
            </a>
            <a href="#" className="hover:text-white transition-colors" aria-label="GitHub">
              <FaGithub className="w-6 h-6" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-6 text-center">
        <p className="text-sm text-gray-400">
          &copy; {new Date().getFullYear()} Fedel AI. All rights reserved.
        </p>
      </div>
    </footer>
  );
}
