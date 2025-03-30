'use client';
import MovieDetails from '@/components/movies';
import Modal from '@/components/shared/modal';
import { Button } from '@/components/ui/button';
import Loading from '@/components/ui/loading';
import Message from '@/components/ui/message';
import UploadSubtitle from '@/components/upload-subtitle';
import { MovieData } from '@/type';
import { Plus } from 'lucide-react';
import React, { use, useEffect, useState } from 'react';

type SearchParams = Promise<{ [key: string]: string | string[] | undefined }>;

const FetchMovies = (props: { searchParams:SearchParams}) => {
    const [movieData, setMovieData] = useState<MovieData[] | null>(null);
    const [error, setError] = useState<string | null>(null);
    const searchParams = use(props.searchParams);
    const query = searchParams.query as string;
    const type = searchParams.type as string | undefined;
    useEffect(() => {
        const fetchMovies = async () => {
            if (!query) {
                setError(' well come Please enter a search movies or series');
                return;
            }
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
        return <div className='w-full h-full flex justify-center items-center'>
            <Message text={error} type='error'/>
        </div>;
    }

    if (!movieData) {
        return <Loading/>
    }



    return (
        <div className='w-full flex justify-center gap-4 h-full p-5 relative'>
            <div className='w-full bg-stone-300 rounded-2xl p-5 dark:bg-stone-700 '>
                <MovieDetails movieData={movieData} />
            </div>
            
        </div>
    );
};

export default function SearchPage({ searchParams }: { searchParams: SearchParams }) {
    const searchParamsValue = use(searchParams);
    return <FetchMovies searchParams={searchParams} />;
}   
