'use client';

import { useLessonStore } from '@/store/lesson.store';
import { Progress } from "@/components/ui/progress";
import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Celebration from '@/components/celebration';
import { useRouter } from 'next/navigation';
import { PhrasalVerb } from '@/type';

export default function Vocabulary() {
  const { lessons, updateLesson } = useLessonStore((state) => state);
  const lesson = lessons[0];

  
  const phresalVerbs = lesson.categories.PhrasalVerbs
  const [currentIndex, setCurrentIndex] = React.useState(0);
  const [isCompleted, setIsCompleted] = React.useState(false);

  console.log(phresalVerbs, "phresalVerbs");

  const router = useRouter();

  const handleNext = () => {
    if (currentIndex < phresalVerbs.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
    }else{
      setIsCompleted(true);
    }

   
    
    updateLesson({
      id: lesson.id,
      categories: {
        ...lesson.categories,
       
        'PhrasalVerbs': phresalVerbs.map((phrasalVerb: PhrasalVerb, index: number) => {
          if (index === currentIndex) {
            console.log(phrasalVerb, "phrasalVerb");
            return {
              ...phrasalVerb,
              isCompleted: true
            };
          }
          return phrasalVerb;
        }),
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

  // Calculate progress percentage
  const progress = ((currentIndex + 1) / phresalVerbs?.length) * 100;

  React.useEffect(() => {
    if (isCompleted) {
      
      const timer = setTimeout(() => {
        router.push(`/lesson/${lesson.id}/idioms`);
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
          {currentIndex + 1} / {phresalVerbs.length}
        </p>
        <Progress value={progress} className='w-full h-2 bg-stone-100 dark:bg-stone-800' />
      </div>

      {/* Vocabulary Item */}
      <div className='w-full h-full flex flex-col items-start space-y-4'>
        <h1 className='text-3xl font-extrabold text-white'>{phresalVerbs[currentIndex].phrase}</h1>
        <p className='text-lg text-white'>{phresalVerbs[currentIndex].meaning}</p>
        <div className='flex flex-col space-y-2 mt-4'>
          <div className='text-lg font-semibold text-white'>Example</div>
          <p className='text-lg text-white'>{phresalVerbs[currentIndex].example}</p>
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
