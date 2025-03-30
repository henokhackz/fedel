"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useSubtitleStore } from "@/store/subtitle.store";
import { useRouter } from "next/navigation";
import { MovieData } from "@/type";
import { useState } from "react";

type MovieProps = React.ComponentProps<"div"> & {
    movie: MovieData;
    setSelectedMovie: (movie: MovieData) => void;
    open: boolean;
};

export function Movie({ className, movie, open, setSelectedMovie, ...props }: MovieProps) {
    const router = useRouter();
    const { addSubtitle } = useSubtitleStore();
    const [isGenerating, setIsGenerating] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const moviePoster = movie.Poster !== "N/A" ? movie.Poster : "/placeholder.jpg";

    const handleGenerateLesson = async () => {
        try {
            setIsGenerating(true);
            setError(null);

            const res = await fetch("/api/subtitle", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ omdbId: movie.imdbID }),
            });

            if (!res.ok) {
                throw new Error(`Failed to generate subtitle: ${res.status}`);
            }

            const data = await res.json().catch(() => {
                throw new Error("Invalid response format");
            });

            if (!data || !data.subtitle || !data.subtitle.id) {
                throw new Error("Subtitle data is missing");
            }

            addSubtitle({ ...data.subtitle, image: moviePoster });
            router.push(`/subtitle/${data.subtitle.id}`);
        } catch (err) {
            setError(err instanceof Error ? err.message : "Unknown error occurred");
        } finally {
            setIsGenerating(false);
        }
    };

    if (error) {
        return (
            <div className="relative group w-full h-[200px] md:w-[200px] md:h-[200px] rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gray-800">
                <Image
                    src={moviePoster}
                    alt={movie.Title}
                    width={300}
                    height={450}
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
                <div className="absolute bottom-4 left-4 right-4 text-stone-100 z-10">
                    <h3 className="text-lg font-bold line-clamp-1">{movie.Title}</h3>
                    <div className="mt-3 flex items-center justify-between">
                        <p className="text-sm text-red-400">{error}</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div
            className={cn(
                "relative group w-full h-[200px] md:w-[200px] md:h-[200px] rounded-xl overflow-hidden shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl bg-gray-800",
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
                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl" />
            <div className="absolute bottom-4 left-4 right-4 text-stone-100 z-10">
                <h3 className="text-lg font-bold line-clamp-1">{movie.Title}</h3>
                <div className="mt-3 flex items-center justify-between">
                    {open && (
                        <button
                            onClick={handleGenerateLesson}
                            disabled={isGenerating}
                            className={cn(
                                "px-4 py-2 text-sm font-medium rounded-full shadow-md transition-transform transform hover:scale-105",
                                isGenerating
                                    ? "bg-stone-400 text-stone-700 cursor-not-allowed"
                                    : "bg-gradient-to-r from-stone-500 to-stone-500 text-white hover:from-stone-600 hover:to-stone-600"
                            )}
                        >
                            {isGenerating ? "Generating..." : "Generate Lesson"}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
