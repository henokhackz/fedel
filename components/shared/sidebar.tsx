'use client'

import useCatagoryStatus from '@/hooks/useCatagoryStatus';
import { Lesson } from '@/type';
import Link from 'next/link';
import React from 'react';
import { FaLock } from 'react-icons/fa';

export default function Sidebar({ lesson }: { lesson: Lesson }) {
  const {
    isVocabularyCompleted,
    isSlangCompleted,
    isIdiomsCompleted,
    isPhrasalVerbsCompleted,
    isGrammarCompleted,
    isQuizCompleted,
  } = useCatagoryStatus({ lessonId: lesson.id });

  const categories = [
    {
      id: "vocabulary",
      color: "text-blue-500",
      name: "Vocabulary",
      isLocked: false, 
    },
    {
      id: "phrasal-verbs",
      color: "text-green-500",
      name: "Phrasal Verbs",
      isLocked: !isVocabularyCompleted,
    },
    {
      id: "idioms",
      color: "text-yellow-500",
      name: "Idioms",
      isLocked: !isPhrasalVerbsCompleted,
    },
    {
      id: "slang",
      color: "text-purple-500",
      name: "Slang",
      isLocked: !isIdiomsCompleted,
    },
    {
      id: "grammar",
      color: "text-red-500",
      name: "Grammar",
      isLocked: !isSlangCompleted,
    },
    {
      id: "quiz",
      color: "text-teal-500",
      name: "Quiz",
      isLocked: !isGrammarCompleted,
    },
  ];

  return (
    <aside className="w-72 bg-gradient-to-b from-stone-100 border border-stone-300/80 dark:border dark:border-stone-800 to-stone-200 dark:from-stone-800 dark:to-stone-900 text-stone-800 dark:text-white p-6 rounded-xl space-y-5">
      <h2 className="text-2xl font-semibold tracking-wide text-stone-700 dark:text-white">Categories</h2>
      <div className="space-y-2">
        {categories.map((category, index) => {
          const routeName = category.name
            .toLowerCase()
            .replace(/-/g, '')
            .replace(' ', '-');

          return (
            <div key={index} className="relative">
              {category.isLocked ? (
                <div className="flex items-center px-4 py-3 text-lg font-medium bg-stone-300 dark:bg-stone-700 rounded-lg opacity-50 cursor-not-allowed">
                  <FaLock className="mr-2" />
                  {category.name}
                </div>
              ) : (
                <Link
                  href={`/lesson/${lesson.id}/${routeName}`}
                  className="block px-4 py-3 text-lg font-medium bg-stone-300 dark:bg-stone-700 hover:bg-stone-400 dark:hover:bg-stone-600 rounded-lg transition-all duration-300 ease-in-out"
                >
                  {category.name}
                </Link>
              )}
            </div>
          );
        })}
      </div>
    </aside>
  );
}
