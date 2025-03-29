'use client'
import StaggeredCategories from '@/components/shared/staggered-catagories'
import { useLessonStore } from '@/store/lesson.store';
import React, { use } from 'react'

export default function Lesson({params}:{params:Promise<{id:string}>}) {

  const {id} = use(params);

  const {lessons } = useLessonStore((state) => state);

  const lesson = lessons.find((item) => item.id === id);
  console.log(lesson, "lesson", id);
  return (
    <div className='w-full h-full'>
      <StaggeredCategories lessonId={id}/>
    </div>
  )
}
