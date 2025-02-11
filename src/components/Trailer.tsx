"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import React from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "./ui/skeleton";

interface Movie {
  id: number;
  key: string;
  title: string;
  trailer: string;
}

export const Trailer = () => {
  const [movie, setMovie] = useState<Movie | null>(null); // null baiwal eniig ashiglan boolen
  const { movieId } = useParams();

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Movie | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  const fetchVideos = async () => {
    try {
      const trailer = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`
      );

      if (!trailer.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await trailer.json();
      console.log(data);

      return data;
    } catch (error: any) {
      setError(error.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchVideos();
      console.log(data?.results[0]);
      setMovie(data?.results[0].key); //medeelel result array 0 ees avaad key trailerluu oron
      setLoading(false);
    };
    if (movieId) loadMovie();
  }, [movieId]);
  if (error)
    return <div className="flex justify-center items-center">Error</div>;

  return (
    <>
      {loading ? (
        <Skeleton className="w-full h-[300px] rounded-lg bg-gray-700" />
      ) : (
        <ReactPlayer
          url={`https://www.youtube.com/watch?v=${movie}`}
          controls={true}
        />
      )}
    </>
  );
};
