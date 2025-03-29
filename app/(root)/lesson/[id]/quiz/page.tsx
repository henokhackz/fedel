'use client';

import { useLessonStore } from '@/store/lesson.store';
import { Progress } from "@/components/ui/progress";
import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Celebration from '@/components/celebration';
import { useRouter } from 'next/navigation';

export default function Vocabulary() {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedOption, setSelectedOption] = useState<string | null>(null);
    const [isQuizCompleted, setIsQuizCompleted] = useState(false);
    const [score, setScore] = useState(0);

    const { lessons } = useLessonStore((state) => state);
    const lesson = lessons[0];
    const quiz = lesson.categories?.Quiz;
    const currentQuestion = quiz.questions[currentQuestionIndex];

    const router = useRouter();

    const handleNextQuestion = () => {
        if (selectedOption === currentQuestion.answer) {
            setScore((prevScore) => prevScore + 1);
        }

        if (currentQuestionIndex < quiz.questions.length - 1) {
            setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
            setSelectedOption(null);
        } else {
            setIsQuizCompleted(true);
        }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prevIndex) => prevIndex - 1);
            setSelectedOption(null);
        }
    };

    useEffect(() => {
        if (isQuizCompleted) {
            const timer = setTimeout(() => {
                router.push('/lesson/completed');
            }, 2000);
            return () => clearTimeout(timer);
        }
    }, [isQuizCompleted, router]);

    if (!quiz || !quiz.questions || quiz.questions.length === 0) {
        return (
            <div className="text-center text-white">
                <p className="text-lg font-semibold mt-4">No quiz available.</p>
            </div>
        );
    }

    if (isQuizCompleted) {
        return (
            <div className="text-center text-white">
                <Celebration />
                <p className="text-lg font-semibold mt-4">Your Score: {score} / {quiz.questions.length}</p>
            </div>
        );
    }

    return (
        <div className="w-full h-full my-6 p-6 bg-gradient-to-r from-stone-500 via-stone-600 to-stone-700 rounded-xl dark:from-stone-800 dark:via-stone-900 dark:to-stone-900">
            {/* Progress */}
            <div className="w-full text-center mb-4">
                <p className="text-lg font-semibold text-white dark:text-gray-300">
                    Question {currentQuestionIndex + 1} / {quiz.questions.length}
                </p>
                <Progress
                    value={((currentQuestionIndex + 1) / quiz.questions.length) * 100}
                    className="w-full h-2 bg-stone-100 dark:bg-stone-800"
                />
            </div>

            {/* Quiz Question */}
            <div className="w-full h-full flex flex-col items-start space-y-4">
                <h1 className="text-3xl font-extrabold text-white">{currentQuestion.question}</h1>
                <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                    {currentQuestion.options.map((option: string, index: number) => (
                        <button
                            key={index}
                            onClick={() => setSelectedOption(option)}
                            className={`px-4 py-2 rounded-lg text-center ${
                                selectedOption === option
                                    ? 'bg-stone-600 text-white'
                                    : 'bg-stone-50 text-stone-700 hover:bg-stone-600 hover:text-white'
                            }`}
                        >
                            {option}
                        </button>
                    ))}
                </div>
            </div>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
                <button
                    onClick={handlePreviousQuestion}
                    disabled={currentQuestionIndex === 0}
                    className="flex px-6 py-3 bg-stone-50 text-stone-700 rounded-xl hover:bg-stone-600 hover:text-white transition disabled:opacity-50"
                >
                    <ChevronLeft size={20} className="mr-2" /> Previous
                </button>
                <button
                    onClick={handleNextQuestion}
                    disabled={!selectedOption}
                    className="px-6 flex py-3 bg-stone-50 text-stone-700 rounded-xl hover:bg-stone-600 hover:text-stone-50 transition disabled:opacity-50"
                >
                    Next <ChevronRight size={20} className="ml-2" />
                </button>
            </div>
        </div>
    );
}
