import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';

type MovieData = {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Response: string;
};

export default function MovieDetails({ movieData }: { movieData: MovieData }) {
  return (
    <Card className="h-full rounded-lg border-none flex flex-row gap-4 shadow-lg">
      <CardHeader className="flex-shrink-0 ">
    
        <Image src={movieData.Poster || '/The_Social_Network_film_poster.png'} height={100} width={100} className='object-cover rounded-lg' alt='poster'/>
      </CardHeader>
      <CardContent className="flex-grow p-6 space-y-4 flex flex-col items-start border border-gray-200 dark:border-gray-700">
        <CardTitle className="text-3xl font-bold text-gray-900 dark:text-white">
          {movieData.Title}
        </CardTitle>
        <div className='space-y-4 flex flex-col items-start justify-start'>
          <CardDescription className="text-sm text-gray-600 dark:text-gray-400">
            {movieData.Year} • {movieData.Genre}
          </CardDescription>
          <p className="text-lg font-semibold text-yellow-500">
            ⭐ IMDb: {movieData.imdbRating}
          </p>
          <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
            {movieData.Plot}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

