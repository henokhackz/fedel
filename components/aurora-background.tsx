"use client";

import { motion } from "motion/react";
import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "./ui/button";
export function HeroText() {
  const router = useRouter();
  return (
    <motion.div
      initial={{ opacity: 0.0, x: 100, y: 40 }}
      whileInView={{
        opacity: 1,
        x: 0,
        y: 0,
      }}
      transition={{
        delay: 0.3,
        duration: 0.8,
        ease: "easeInOut",
      }}
      className="relative flex flex-col gap-6 items-center justify-center px-6 py-12"
      style={{
        transformOrigin: "center",
      }}
      viewport={{ once: true }}
    >
      <div className="text-center">
        <h1 className="text-4xl md:text-4xl  font-extrabold dark:text-white text-gray-900 leading-tight">
          Learn Through Your Favorite Movie Dialogues.
        </h1>
        <p className="font-light text-lg md:text-xl dark:text-stone-200 text-gray-700 mt-4">
          Turn subtitles into interactive lessons—boost your vocabulary, master grammar, and improve comprehension effortlessly!
        </p>
        <Button onClick={() => router.push("/search")} variant={'default'} className="mt-6 bg-gradient-to-r from-stone-800 to-stone-900 hover:from-stone-900 ease-in-out hover:to-stone-800 text-stone-100  dark:bg-stone-100 duration-300 dark:text-stone-100  font-medium rounded-full px-6 py-3 shadow-lg transform transition-transform hover:scale-105">
          Start now
        </Button>
      </div>
    </motion.div>
  );
}
