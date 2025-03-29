'use client';

import { useLessonStore } from '@/store/lesson.store';
import { Progress } from "@/components/ui/progress";
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Celebration from '@/components/celebration';
import { useRouter } from 'next/navigation';
import { Idiom } from '@/type';

export default function Vocabulary() {
    const { lessons, updateLesson } = useLessonStore((state) => state);

    if (!lessons || lessons.length === 0) {
        return <div className="text-center text-white">No lessons available.</div>;
    }

    const lesson = lessons[0];

    if (!lesson.categories || !lesson.categories.Idioms) {
        return <div className="text-center text-white">No Idioms found in this lesson.</div>;
    }

    const idioms = lesson.categories.Idioms;
    const [currentIndex, setCurrentIndex] = React.useState(0);
    const [isCompleted, setIsCompleted] = React.useState(false);

    const router = useRouter();

    const handleNext = () => {
        if (!idioms || idioms.length === 0) {
            return;
        }

        if (currentIndex < idioms.length - 1) {
            setCurrentIndex(currentIndex + 1);
            console.log(currentIndex, idioms.length - 1, "idioms");
        } 

        if (currentIndex === idioms.length - 1) {
            setIsCompleted(true);
        }

        updateLesson({
            id: lesson.id,
            categories: {
            ...lesson.categories,
            Idioms: idioms.map((idiom: Idiom, index: number) => {
                if (index === currentIndex) {
                return {
                    ...idiom,
                    isCompleted: true,
                };
                }
                console.log(idiom, "idiom yes no");
                return idiom;
            }),
            },
            lessonTitle: lesson.lessonTitle,
            level: lesson.level,
            description: lesson.description,
            subtitleContext: lesson.subtitleContext,
        } as typeof lesson);
    };

    const handlePrevious = () => {
        if (currentIndex > 0) {
            setCurrentIndex(currentIndex - 1);
        }
    };

    // Calculate progress percentage
    const progress = idioms?.length
        ? ((currentIndex + 1) / idioms.length) * 100
        : 0;

    React.useEffect(() => {
        if (isCompleted) {
            const timer = setTimeout(() => {
                router.push(`/lesson/${lesson.id}/slang`);
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isCompleted, router, lesson.id]);

    if (isCompleted) {
        return <Celebration />;
    }

    return (
        <div className='w-full h-full my-6 p-6 bg-gradient-to-r from-stone-500 via-stone-600 to-stone-700 rounded-xl dark:from-stone-800 dark:via-stone-900 dark:to-stone-900'>
            {/* Progress */}
            <div className='w-full text-center mb-4'>
                <p className='text-lg font-semibold text-white dark:text-gray-300'>
                    {currentIndex + 1} / {idioms.length}
                </p>
                <Progress value={progress} className='w-full h-2 bg-stone-100 dark:bg-stone-800' />
            </div>

            {/* Vocabulary Item */}
            <div className='w-full h-full flex flex-col items-start space-y-4'>
                <h1 className='text-3xl font-extrabold text-white'>{idioms[currentIndex]?.idiom}</h1>
                <p className='text-lg text-white'>{idioms[currentIndex]?.meaning}</p>
                <div className='flex flex-col space-y-2 mt-4'>
                    <div className='text-lg font-semibold text-white'>Example</div>
                    <p className='text-lg text-white'>{idioms[currentIndex]?.example}</p>
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className='flex justify-between mt-8'>
                <button
                    onClick={handlePrevious}
                    disabled={currentIndex === 0}
                    className='flex px-6 py-3 bg-stone-50 text-stone-700 rounded-xl hover:bg-stone-600 hover:text-white transition disabled:opacity-50'
                >
                    <ChevronLeft size={20} className='mr-2' /> Previous
                </button>
                <button
                    onClick={handleNext}
                    disabled={isCompleted}
                    className='px-6 flex py-3 bg-stone-50 text-stone-700 rounded-xl hover:bg-stone-600 hover:text-stone-50 transition disabled:opacity-50'
                >
                    Next <ChevronRight size={20} className='ml-2' />
                </button>
            </div>
        </div>
    );
}
