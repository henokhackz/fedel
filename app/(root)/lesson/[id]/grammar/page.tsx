'use client';

import { useLessonStore } from '@/store/lesson.store';
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Celebration from '@/components/celebration';
import { useRouter } from 'next/navigation';

export default function Grammar() {
    const { lessons, updateLesson } = useLessonStore((state) => state);
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isCompleted, setIsCompleted] = React.useState(false);
    const router = useRouter();

    if (!lessons || lessons.length === 0) {
        return <div className="text-center text-white text-lg font-medium">No lessons available.</div>;
    }

    const lesson = lessons[0];
    const grammarItem = lesson.categories?.Grammar;

    if (!grammarItem) {
        return <div className="text-center text-white text-lg font-medium">No Grammar found in this lesson.</div>;
    }

    const handleNext = () => {
        setIsCompleted(true);
        updateLesson({
            id: lesson.id,
            categories: {
                ...lesson.categories,
                Grammar: {
                    ...grammarItem,
                    isCompleted: true,
                },
            },
            lessonTitle: lesson.lessonTitle,
            level: lesson.level,
            description: lesson.description,
            subtitleContext: lesson.subtitleContext,
        });
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    React.useEffect(() => {
        if (isCompleted) {
            const timer = setTimeout(() => {
                router.push(`/lesson/${lesson.id}/quiz`);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCompleted, router, lesson.id]);

    if (isCompleted) {
        return <Celebration />;
    }

    return (
        <div className="w-full h-full my-6 p-8 bg-gradient-to-r from-stone-500 via-stone-600 to-stone-700 rounded-2xl shadow-lg dark:from-stone-800 dark:via-stone-900 dark:to-stone-900">
            <div className="w-full h-full flex flex-col items-center space-y-6">
                <h2 className="text-4xl font-extrabold text-white tracking-wide">{grammarItem?.topic}</h2>
            </div>

            {/* Grammar Item */}
            <div className="w-full h-full flex flex-col items-start space-y-6 mt-6">
                <h1 className="text-2xl font-semibold text-stone-300">{grammarItem.explanation.toLowerCase()}</h1>
                <div className="flex flex-col space-y-4 mt-6">
                    <div className="text-2xl font-bold text-white underline">Examples</div>
                    {grammarItem?.examples?.map((example: { ruleApplied: string; sentence: string }, index: number) => (
                        <div key={index} className="flex flex-col space-y-2 p-4 bg-stone-800 rounded-lg shadow-md">
                            <p className="text-white text-lg font-semibold">{example.ruleApplied}</p>
                            <p className="text-white text-lg">{example.sentence}</p>
                        </div>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-10">
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className="flex items-center px-8 py-4 bg-stone-50 text-stone-700 rounded-full shadow-md hover:bg-stone-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <ChevronLeft size={24} className="mr-2" /> Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={isCompleted}
                    className="flex items-center px-8 py-4 bg-stone-50 text-stone-700 rounded-full shadow-md hover:bg-stone-600 hover:text-white transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Next <ChevronRight size={24} className="ml-2" />
                </button>
            </div>
        </div>
    );
}
