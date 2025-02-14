"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { Skeleton } from "./ui/skeleton";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

interface Movie {
  id: number;
  key: string;
}

export const Trailer = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  const fetchVideos = async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/${movieId}/videos?language=en-US&api_key=${API_KEY}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch movie details");
      }

      const data = await response.json();
      return data;
    } catch (err: any) {
      setError(err.message);
      return null;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadMovie = async () => {
      setLoading(true);
      const data = await fetchVideos();
      setMovie(data?.results[0]?.key || null);
      setLoading(false);
    };

    if (movieId) loadMovie();
  }, [movieId]);

  if (error)
    return <div className="flex justify-center items-center">Error</div>;

  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="h-[50px] w-[50px] rounded-full bg-red-600 cursor-pointer flex justify-center items-center absolute bottom-0 left-0">
          ▶
        </div>
      </DialogTrigger>
      <DialogContent className="p-0 bg-transparent border-none shadow-none">
        {/* Hidden Title for Accessibility */}
        <VisuallyHidden>
          <DialogTitle>Movie Trailer</DialogTitle>
        </VisuallyHidden>

        {/* Close Button with Gray Border */}
        <DialogClose className="absolute top-2 right-2 w-8 h-8 flex items-center justify-center border border-gray-500 rounded-full bg-transparent text-white hover:bg-gray-800 transition">
          ✕
        </DialogClose>

        {loading ? (
          <Skeleton className="w-[512px] h-[280px] rounded-lg bg-gray-700" />
        ) : (
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movie}`}
            controls
            width="512px"
            height="280px"
          />
        )}
      </DialogContent>
    </Dialog>
  );
};
