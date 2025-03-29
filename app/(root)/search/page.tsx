'use client';
import MovieDetails from '@/components/movies';
import { Button } from '@/components/ui/button';
import UploadSubtitle from '@/components/upload-subtitle';
import { Plus } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';

type MovieData = {
    Title: string;
    Year: string;
    Genre: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Response: string;
};

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const FetchMovies = (props: { searchParams:SearchParams}) => {
    const [movieData, setMovieData] = useState<MovieData[] | null>(null);
    const [error, setError] = useState<string | null>(null);

    const searchParams = use(props.searchParams);
    const query = searchParams.query as string;
    const type = searchParams.type as string | undefined;
    const [open , setOpen] = useState(false);
    
    console.log(query, type);

    useEffect(() => {
        const fetchMovies = async () => {
            try {
                const response = await fetch(
                   `api/search/?query=${query}&type=${type}`,
                   {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                   }
                );
                console.log(response, "response");
                if (!response.ok) {
                    setError('Failed to fetch data from OMDB');
                    return;
                }

                const data = await response.json();
                console.log(data, "data");

                if (data.Response === 'False') {
                    setError(data.Error);
                    return;
                }

                setMovieData(data.Search);
            } catch (err) {
                console.error(err);
                setError('An unexpected error occurred');
            }
        };

        fetchMovies();
    }, [query, type]);

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movieData) {
        return <div>Loading...</div>;
    }



    return (
        <div className='w-full flex justify-center gap-4 h-full p-5 relative'>
            <div className='w-full'>
                <MovieDetails movieData={movieData} />
            </div>
            <div className='flex flex-col space-y-4 absolute top-0 right-0 z-50 mb-4'>
                {
                    open ? (
                        <UploadSubtitle  setOpen={setOpen}/>

                    ):<Button onClick={() => setOpen(!open)} className='bg-stone-700 dark:bg-stone-600 text-stone-50 dark:stone-100 hover:bg-stone-800 dark:hover:bg-stone-500'>
                        <Plus className='text-stone-50 dark:text-stone-100'  /> Upload Subtitle
                        </Button>
                }
            </div>
        </div>
    );
};

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
    const searchParamsValue = use(searchParams);
    return <FetchMovies searchParams={searchParams} />;
}    // Removed unused searchParamsValue
