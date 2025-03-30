import React, { useEffect, useState } from 'react';

import { Movie } from './movie';
import Modal from './shared/modal';
import useOsAuth from '@/hooks/use-os-auth';
import { MovieData } from '@/type';



export default function MovieDetails({ movieData }: { movieData: MovieData[] }) {

   useOsAuth()
  const [selectedMovie, setSelectedMovie] = React.useState<MovieData | null>(null);
  const [open, setOpen] = useState(false);
  

useEffect(() => {
    if (selectedMovie) {
      setOpen(true);
    } else {
      setOpen(false);
    }
  }, [selectedMovie]);
  
  return (
   <div className='w-full  rounded-2xl text-stone-800 p-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4  gap-4  '>
     {
       movieData && movieData.map((movie, index) => (
        <Movie key={index} movie={movie}  setSelectedMovie={setSelectedMovie} open={open}/>
       ))
     }
{     selectedMovie && open &&  (
       <Modal open={!!selectedMovie} setOpen={setOpen}>
         <Movie movie={selectedMovie} setSelectedMovie={setSelectedMovie} open={open}/>
       </Modal>
     )}
   </div>
  );
}

