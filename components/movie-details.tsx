import React from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from 'next/image';

type MovieData = {
  Title: string;
  Year: string;
  Genre: string;
  Plot: string;
  Poster: string;
  imdbRating: string;
  Response: string;
};

export default function MovieDetails({ movieData }: { movieData: MovieData }) {
  return (
    <Card>
  <CardHeader>
    <CardTitle>{movieData.Title}</CardTitle>
    <CardDescription>
      <Image src={'/no_poster.png'} alt={movieData.Title} width={150} height={200} />
      <p>{movieData.Year}</p>
      <p>{movieData.Genre}</p>
      <p>{movieData.Plot}</p>
      <p>IMDB Rating: {movieData.imdbRating}</p>
    </CardDescription>
  </CardHeader>
  <CardContent>
    <p>Card Content</p>
  </CardContent>

</Card>

  );
}

