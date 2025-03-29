import { cn } from "@/lib/utils"
import Image from "next/image"

type MovieData = {
    Title: string
    Year: string
    Genre: string
    Plot: string
    Poster: string
    imdbRating: string
    Response: string
}

type MovieProps = React.ComponentProps<"div"> & {
    movie: MovieData
}

export function Movie({ className, movie, ...props }: MovieProps) {
    const moviePoster = movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg"

    return (
        <div
            className={cn(
                "relative group w-[250px] h-[350px] rounded-2xl overflow-hidden shadow-lg transition-transform transform hover:scale-105",
                className
            )}
            {...props}
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
                    <button className="px-3 py-1 text-sm bg-white text-black rounded-full shadow-md hover:bg-gray-200 transition">
                        Generate Lesson
                    </button>
                </div>
            </div>
        </div>
    )
}
