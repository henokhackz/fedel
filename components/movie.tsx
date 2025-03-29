'use client'
import { cn } from "@/lib/utils"
import { SubtitleData } from "@/type"
import Image from "next/image"
import { useState } from "react"
import { useSubtitleStore } from "@/store/subtitle.store"
import { useRouter } from "next/navigation"

type MovieData = {
    Title: string
    Year: string
    Genre: string
    Plot: string
    Poster: string
    imdbID: string
    imdbRating: string
    Response: string
}

type MovieProps = React.ComponentProps<"div"> & {
    movie: MovieData,
    setSelectedMovie: (movie: MovieData) => void    
}



export function Movie({ className, movie,setSelectedMovie , ...props }: MovieProps) {
    const router = useRouter();
   
    const {addSubtitle} = useSubtitleStore();
    
    
    const moviePoster = movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"
    const handleGenerateLesson = async () => {
        
        const  res = await fetch("/api/subtitle", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ omdbId: movie.imdbID }),
        });


        if (!res.ok) {
            throw new Error(`Failed to generate lesson: ${res.status}`);
        }   

        const {subtitle: data} = await res.json();
        addSubtitle(data);
        console.log(data, 'data', data.id);
        router.push(`/subtitle/${data.id}`);

            }

     


    return (
        <div
            className={cn(
                "relative group w-[250px] h-[350px] rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105",
                className
            )}
            {...props}
            onClick={() => setSelectedMovie(movie)}
        >
            <Image
                src={moviePoster}
                alt={movie.Title}
                width={300}
                height={450}
                className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl" />
            <div className="absolute bottom-4 left-4 right-4 text-white z-10">
                <h3 className="text-lg font-bold">{movie.Title}</h3>
                <p className="text-sm text-gray-300">{movie.Year} • {movie.Genre}</p>
                <p className="text-xs mt-1 line-clamp-2">{movie.Plot}</p>
                <div className="mt-2 flex items-center justify-between">
                    <button onClick={handleGenerateLesson} className="px-3 py-1 text-sm bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition">
                        Generate Lesson
                    </button>
                </div>
            </div>
        </div>
    )
}
