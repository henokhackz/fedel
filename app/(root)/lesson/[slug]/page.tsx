'use client'
import { useLessonStore } from '@/store/lesson.store';
import React from 'react'
import {use} from 'react'
export default function page({params}:{params:Promise<{slug:string}>}) {
    const {slug} = use(params);
    const {lessons} = useLessonStore((state) => state);
    const lesson = lessons.find((l) => l.lessonTitle === slug)
    console.log(lesson, 'lesson');
    console.log(slug, 'slug');
    console.log(lessons, 'lessons');
    console.log('lessonTitle', lessons[0].lessonTitle);
  return (
    <div className='w-full p-5 h-full'>
        <h1>{slug}</h1>
    </div>
  )
}
