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

export default function MovieDetails({ movieData }:{movieData:MovieData}) {
  return (
    <div className="w-full  bg-white dark:bg-gray-900  rounded-lg">
              <img
                src={movieData.Poster !== "N/A" ? movieData.Poster : "/no-image.png"}
                alt={movieData.Title}
                className="w-full h-96 object-cover p-5 rounded-lg"
              />
              <div className="p-6">
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">{movieData.Title}</h1>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">{movieData.Year} • {movieData.Genre}</p>
                <p className="text-lg font-semibold text-yellow-500 mt-2">⭐ IMDb: {movieData.imdbRating}</p>
                <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm">{movieData.Plot}</p>
              </div>
            </div>
  )
}
