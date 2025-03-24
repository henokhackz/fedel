import MovieDetails from '@/components/movie-details'
import UploadSubtitle from '@/components/upload-subtitle';
import React from 'react'

type MovieData = {
    Title: string;
    Year: string;
    Genre: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Response: string;
  };

const dummyMovieData: MovieData = {
    Title: "Inception",
    Year: "2010",
    Genre: "Action, Adventure, Sci-Fi",
    Plot: "A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    Poster: "https://example.com/inception.jpg",
    imdbRating: "8.8",
    Response: "True",
};

export default function  SearchPage() {
    return (
        <div className='w-full flex justify-center gap-4  h-full p-5'>
            <div className='w-1/2'>
                <MovieDetails movieData={dummyMovieData} />
            </div>
            <div className='flex flex-col space-y-4'>
                <UploadSubtitle/>
            </div>
        </div>
    )
}