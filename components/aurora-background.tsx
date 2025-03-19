"use client";

import { motion } from "motion/react";
import React from "react";
import { AuroraBackground } from "./aurora-bg";

export function HeroText() {
  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-6 items-center justify-center px-6 py-12"
      >
        <div className="text-center">
          <h1 className="text-4xl md:text-7xl font-extrabold dark:text-white text-gray-900 leading-tight">
            Learn Through Your Favorite Movie Dialogues.
          </h1>
          <p className="font-light text-lg md:text-2xl dark:text-stone-200 text-gray-700 mt-4">
            Turn subtitles into interactive lessons—boost your vocabulary, master grammar, and improve comprehension effortlessly!
          </p>
          <button className="mt-6 bg-gradient-to-r from-stone-500 to-stone-600 hover:from-stone-600 hover:to-stone-700 text-white dark:text-stone-800 font-medium rounded-full px-6 py-3 shadow-lg transform transition-transform hover:scale-105">
            Start now
          </button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
