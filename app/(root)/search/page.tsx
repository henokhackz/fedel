import MovieDetails from "@/components/movie-details";
import Subtitle from "@/components/subtitle";
import Image from "next/image";
import React from "react";

// Define types for movie data
type MovieData = {
    Title: string;
    Year: string;
    Genre: string;
    Plot: string;
    Poster: string;
    imdbRating: string;
    Response: string;
};

// Define types for subtitle data
type SubtitleData = {
    id: string;
    attributes: {
        language: string;
        release: string;
        url: string;
    };
};

export default async function Search(props: { searchParams: { [key: string]: string | undefined } }) {
    const { query, type = "movies" } = props.searchParams;

    if (!query) {
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Search Movies & Series
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    Please enter a search query to find movies or series.
                </p>
            </div>
        );
    }

    try {
        // Fetch movie data from OMDB
        const res = await fetch(
            `http://www.omdbapi.com/?apikey=${process.env.OMDB_API_KEY}&t=${query}`
        );
        const movieData: MovieData = await res.json();

        if (movieData.Response === "False") {
            return (
                <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                    <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                        No Results Found
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400 mt-2">
                        No movie or series found for "{query}". Try searching again.
                    </p>
                </div>
            );
        }

        // Fetch subtitles from OpenSubtitles
        const subtitleRes = await fetch(
            `https://api.opensubtitles.com/api/v1/subtitles?query=${query}`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Api-Key": process.env.OPEN_SUBTITLES_API_KEY!,
                    "User-Agent": "MyApp v1.0",
                },
            }
        );
        const subtitleData = await subtitleRes.json();

        return (
            <div className="flex flex-col md:flex-row items-start justify-between min-h-screen p-6 gap-6">
                {/* Movie Details Section */}
                <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6">
                    <MovieDetails movieData={movieData} />
                </div>

                {/* Subtitle Section */}
                <div className="w-full md:w-1/2 bg-white dark:bg-gray-900 shadow-lg rounded-lg p-6 max-h-screen overflow-y-scroll overflow-x-hidden">
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                        Available Subtitles
                    </h2>
                    {subtitleData.data && subtitleData.data.length > 0 ? (
                        <ul className="mt-4 divide-y divide-gray-200 dark:divide-gray-800">
                            {subtitleData.data.map((subtitle: SubtitleData) => (
                                <li key={subtitle.id} className="py-2 ">
                                    <Subtitle subtitleData={subtitle} />
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600 dark:text-gray-400 mt-2">
                            No subtitles found for "{query}".
                        </p>
                    )}
                </div>
            </div>
        );
    } catch (error) {
        console.error(error);
        return (
            <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
                <h1 className="text-2xl font-semibold text-gray-800 dark:text-gray-200">
                    Something Went Wrong
                </h1>
                <p className="text-gray-600 dark:text-gray-400 mt-2">
                    An error occurred while fetching data. Please try again later.
                </p>
            </div>
        );
    }
}