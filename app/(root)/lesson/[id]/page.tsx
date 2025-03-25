"use client";

import { useLessonStore } from "@/store/lesson.store";
import React from "react";
import { use } from "react";
import { Lock, CheckCircle, BookText } from "lucide-react";

export default function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { lessons } = useLessonStore((state) => state);
  const lesson = lessons[0]

  if (!lesson) return <div className="text-center text-gray-500">Lesson not found</div>;

  // Get categories
  const categories = Object.entries(lesson.categories);

  return (
    <div className="flex h-screen relative">
      {/* Sidebar */}
      <aside className="w-64 bg-stone-100 text-stone-800 p-5 flex flex-col space-y-4 dark:bg-stone-800 dark:text-stone-50">
        <h2 className="text-xl font-bold mb-3">Categories</h2>
        {categories.map(([categoryName], index) => (
          <button
            key={index}
            className="p-3 text-left bg-stone-300 hover:bg-stone-400 rounded-lg transition"
          >
            {categoryName}
          </button>
        ))}
      </aside>

      {/* Lesson Content */}
      <main className="flex-1 p-10 max-h-screen overflow-y-scroll">
        <h1 className="text-2xl font-bold mb-4">{lesson.lessonTitle}</h1>
        <p className="text-gray-600 mb-6">{lesson.description}</p>
         <div className="flex flex-col space-y-4">
         <div className="bg-stone-100 p-4 rounded-lg shadow-md">
            <h2 className="text-lg font-semibold mb-2">Step 1 </h2>
            <p className="text-gray-600">Idioms</p>
          </div>
        <div className="grid grid-cols-2 gap-6">
          
          {
            lesson.categories.Idioms.map((item, index) => (
              <div key={index} className="bg-stone-100 p-4 rounded-lg shadow-md">
                <h2 className="text-lg font-semibold mb-2">{item.idiom}</h2>
                <p className="text-gray-600">{item.meaning}</p>
              </div>
            ))
          }
        </div>
            </div>
      </main>
    </div>
  );
}
