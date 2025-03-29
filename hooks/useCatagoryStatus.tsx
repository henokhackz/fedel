'use client'
import { useLessonStore } from '@/store/lesson.store';
import React from 'react'

export default function useCatagoryStatus({lessonId}:{lessonId:string}) {
    const {lessons} = useLessonStore((state) => state);
    const lesson = lessons[0];
    
    const vocabulary = lesson.categories.Vocabulary;
    const slang = lesson.categories.Slang;
    const idioms = lesson.categories.Idioms;
    const phrasalVerbs = lesson.categories.PhrasalVerbs;
    const grammar = lesson.categories.Grammar;
    const quiz = lesson.categories.Quiz;

    const isVocabularyCompleted = vocabulary.every((item) => item.isCompleted);
    const isSlangCompleted = slang.every((item) => item.isCompleted);
    const isIdiomsCompleted = idioms.every((item) => item.isCompleted);
    const isPhrasalVerbsCompleted = phrasalVerbs.every((item) => item.isCompleted);
    const isGrammarCompleted = grammar.isCompleted
    const isQuizCompleted = quiz.questions.every((item: { isCompleted: any; }) => item.isCompleted);
 


  return (
    {
        isVocabularyCompleted,
        isSlangCompleted,
        isIdiomsCompleted,
        isPhrasalVerbsCompleted,
        isGrammarCompleted,
        isQuizCompleted
    }
  )
}
