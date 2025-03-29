'use client'
import Sidebar from '@/components/shared/sidebar'
import { useLessonStore } from '@/store/lesson.store';

import React, { use } from 'react'

export default function LessonLayout({children, params}:{children:React.ReactNode, params:Promise<{id:string}>}) {
  const {lessons} = useLessonStore((state) => state);
  const {id } = use(params);
  const lesson = lessons?.find((item) => item.id === id);
  

  return (
    <div className='w-full flex justify-between items-start relative h-full gap-4'>
      {lesson ? (
        <div className='hidden lg:block'>
          <Sidebar lesson={lesson} />
        </div>
      ) : (
        <div>No lesson data available</div>
      )}
      <div className='w-full h-full p-4'>
        {children}
      </div>
    </div>
  )
}
