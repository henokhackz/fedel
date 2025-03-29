import React, { useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';
import { Movie } from './movie';
import Modal from './shared/modal';
import useOsAuth from '@/hooks/use-os-auth';

type MovieData = {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Response: string;
  imdbID: string;
};

export default function MovieDetails({ movieData }: { movieData: MovieData[] }) {

  const {token} = useOsAuth()
  const [selectedMovie, setSelectedMovie] = React.useState<MovieData | null>(null);
  const [open, setOpen] = React.useState(false);
  console.log(movieData, "movieData");

useEffect(() => {
    if (selectedMovie) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedMovie]);
  
  return (
   <div className='w-full  rounded-2xl text-stone-800 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4'>
     {
       movieData && movieData.map((movie, index) => (
        <Movie key={index} movie={movie}  setSelectedMovie={setSelectedMovie}/>
       ))
     }
{     selectedMovie && open &&  (
       <Modal open={!!selectedMovie} setOpen={setOpen}>
         <Movie movie={selectedMovie} setSelectedMovie={setSelectedMovie}/>
       </Modal>
     )}
   </div>
  );
}

