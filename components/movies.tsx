import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { Movie } from './movie';

type MovieData = {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Response: string;
};

export default function MovieDetails({ movieData }: { movieData: MovieData[] }) {
  return (
   <div className='w-full  rounded-2xl text-stone-800 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4'>
     {
       movieData && movieData.map((movie, index) => (
        <Movie key={index} movie={movie} />
       ))
     }
   </div>
  );
}

