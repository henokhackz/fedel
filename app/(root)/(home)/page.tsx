'use client';

import Hero from '@/components/hero';
import TestimonialSlider from '@/components/testmonials';
import WorldMap from '@/components/ui/world-map';
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  return (
    <motion.div
      className='w-full min-h-screen flex flex-col space-y-16 items-center justify-between overflow-hidden bg-transparent dark:bg-stone-900 text-stone-900 dark:text-stone-100'
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8 }}
    >
      {/* Hero Section */}
      <motion.div
        className='w-full relative max-w-7xl flex flex-col lg:flex-row items-center justify-between py-24 px-8 lg:px-20'
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1 }}
      >
       
        
        {/* Hero Text */}
        <motion.div
          className='lg:w-1/2 flex flex-col items-center lg:items-start space-y-6 text-center lg:text-left'
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        >
          <Hero />
          <p className='text-lg max-w-md'>
            Revolutionize your workflow with our cutting-edge SaaS platform. Simplify, automate, and grow your business.
          </p>
          <div className='flex space-x-4'>
            <button className='px-6 py-3 bg-stone-700 dark:bg-stone-600 text-white rounded-lg shadow-lg hover:bg-stone-800 dark:hover:bg-stone-500 transition'>
              Get Started
            </button>
            <button className='px-6 py-3 border border-stone-700 dark:border-stone-600 text-stone-700 dark:text-stone-300 rounded-lg hover:bg-stone-700 dark:hover:bg-stone-500 hover:text-white transition'>
              See Live Demo
            </button>
          </div>
        </motion.div>

        {/* Hero Image */}
        <motion.div
          className='lg:w-1/2 flex justify-center mt-12 lg:mt-0'
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className='rounded-lg overflow-hidden'>
            <Image src='/cyber.png' alt='hero' width={500} height={600} className='w-full object-cover rounded-lg opacity-90' />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Testimonial Section */}
      <motion.div
        className='w-full max-w-5xl px-8 lg:px-20 py-16 bg-stone-200 dark:bg-stone-800 rounded-lg text-center shadow-md'
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.6 }}
      >
        <h2 className='text-3xl font-bold mb-6'>What Our Users Say</h2>
        <TestimonialSlider />
      </motion.div>

      {/* World Map Section */}
      <motion.div
        className='w-full max-w-5xl px-8 lg:px-20 py-16 flex flex-col items-center'
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <h2 className='text-3xl font-bold text-center mb-6'>Trusted by Users Worldwide</h2>
        <WorldMap
          dots={[
            { start: { lat: 40.7128, lng: -74.0060, label: 'New York' }, end: { lat: 40.7128, lng: -74.0060 } },
            { start: { lat: 51.5074, lng: -0.1278, label: 'London' }, end: { lat: 51.5074, lng: -0.1278 } },
            { start: { lat: 35.6895, lng: 139.6917, label: 'Tokyo' }, end: { lat: 35.6895, lng: 139.6917 } },
            { start: { lat: 9.145, lng: 40.489673, label: 'Ethiopia' }, end: { lat: 9.145, lng: 40.489673 } },
            { start: { lat: -1.2921, lng: 36.8219, label: 'Africa' }, end: { lat: -1.2921, lng: 36.8219 } },
          ]}
          lineColor='#57534e'
        />
      </motion.div>
    </motion.div>
  );
}
