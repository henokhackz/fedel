'use client'
import { useState } from "react";
import { motion } from "framer-motion";
import { FaQuoteLeft, FaQuoteRight } from "react-icons/fa";

const testimonials = [
    {
        name: "Abebe Bekele",
        role: "Software Engineer",
        company: "EthioTech Solutions",
        testimonial:
            "This platform has completely transformed the way I work. The intuitive design and powerful features make it a game changer!",
        image: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    {
        name: "Sara Worku",
        role: "UI/UX Designer",
        company: "Addis Creative Studio",
        testimonial:
            "A must-have for professionals! The user experience is seamless, and the support team is always helpful.",
        image: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
        name: "Teshome Mesfin",
        role: "Product Manager",
        company: "Abyssinia Innovations",
        testimonial:
            "Our team productivity has skyrocketed since we started using this service. Highly recommended!",
        image: "https://randomuser.me/api/portraits/men/50.jpg",
    },
    {
        name: "Liya Alemu",
        role: "Data Scientist",
        company: "AI Labs Ethiopia",
        testimonial:
            "The insights and analytics provided by this platform are unparalleled. It has been a game-changer for our projects.",
        image: "https://randomuser.me/api/portraits/women/68.jpg",
    },
];

export default function TestimonialSlider() {
   

    
    return (
        <div className={`max-w-7xl mx-auto p-6}`}>
            <motion.div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {testimonials.map(({ name, role, company, testimonial, image }, index) => (
                    <motion.div
                        key={index}
                        className="bg-stone-100 dark:bg-stone-800 p-6 shadow-lg rounded-lg text-center hover:shadow-2xl transition-shadow duration-300"
                        whileHover={{ scale: 1.05 }}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.2, duration: 0.6 }}
                    >
                        <FaQuoteLeft className="text-stone-400 dark:text-stone-500 text-3xl mx-auto mb-4" />
                        <p className="text-lg italic text-stone-700 dark:text-stone-300">"{testimonial}"</p>
                        <FaQuoteRight className="text-stone-400 dark:text-stone-500 text-3xl mx-auto mt-4" />
                        <div className="mt-6">
                            <motion.img
                                src={image}
                                alt={name}
                                className="w-16 h-16 rounded-full mx-auto mb-2"
                                whileHover={{ rotate: 10 }}
                                transition={{ type: "spring", stiffness: 300 }}
                            />
                            <h3 className="text-lg font-semibold dark:text-stone-200">{name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {role} at {company}
                            </p>
                        </div>
                    </motion.div>
                ))}
            </motion.div>
        </div>
    );
}
