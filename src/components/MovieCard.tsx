"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { First } from "./layout/header/Header";
import { useParams, useRouter } from "next/navigation";
import { Trailer } from "./Trailer";
import { log } from "console";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
  vote_average: number;
  overview: string;
  backdrop_path: string;
  genres: { id: number; name: string }[];
  crew: null;
  name: string;
  data: string;
  popularity: number;
}
interface CrewMember {
  id: number;
  name: string;
}

export const MovieCard = () => {
  const [movie, setMovie] = useState<Movie | null>(null);
  const [directors, setDirectors] = useState<string | null>(null);
  const [writers, setWriters] = useState<string | null>(null);
  const [stars, setStars] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);
  const { movieId } = useParams();
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = "https://api.themoviedb.org/3";
  const TMDB_IMAGE_URL = "https://image.tmdb.org/t/p";

  useEffect(() => {
    if (!movieId) return;

    const fetchMovie = async () => {
      try {
        const response = await axios.get<Movie>(
          `${TMDB_BASE_URL}/movie/${movieId}`,
          {
            params: {
              api_key: API_KEY,
              language: "en-US",
            },
          }
        );

        setMovie(response.data);
        console.log(response.data, "data");
      } catch (error) {
        setError((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };
    const fetchDirectors = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${movieId}/credits`,
          {
            params: {
              language: "en-US",
              api_key: API_KEY,
            },
          }
        );

        console.log(response);

        setDirectors(
          response?.data?.crew[0]?.department === "Directing"
            ? response?.data?.crew[0]?.name
            : "Unknown"
        );
        setWriters(
          response?.data?.crew?.[0]?.writers === "Writers"
            ? response?.data?.crew?.[0]?.name
            : "Unknown"
        );
        setStars(
          response?.data?.crew[0]?.department === "Stars"
            ? response?.data?.crew[0]?.name
            : "Unknown"
        );
      } catch (err) {
        setError((err as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    fetchDirectors();
    fetchMovie();
  }, [movieId]);

  if (loading)
    return <div className="text-center">Loading movie details...</div>;
  if (error)
    return <div className="text-center text-red-500">Error: {error}</div>;
  if (!movie)
    return <div className="text-center text-gray-500">Movie not found.</div>;

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />

      <div className="mx-auto text-white w-[1080px]">
        <div className="flex justify-between ">
          <h1 className="text-2xl text-black font-semibold">{movie.title}</h1>
          <h1 className="text-[black] p-2">
            {movie.vote_average.toFixed(1)}/10
          </h1>
          {/* <h1 className="text-[red]">{movie.popularity}</h1> */}
        </div>

        <div className="flex gap-8 justify-center mt-4">
          {movie.poster_path && (
            <img
              src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
              className="rounded-lg h-[430px] w-[288px] object-cover "
              alt={movie.title}
            />
          )}

          <div className="relative">
            {movie.backdrop_path && (
              <img
                src={`${TMDB_IMAGE_URL}/original${movie.backdrop_path}`}
                className="w-[760px] h-[430px] rounded-lg object-cover "
                alt={movie.title}
              />
            )}
            {clicked ? (
              <Trailer />
            ) : (
              <div
                className="h-[50px] w-[50px] rounded-full bg-red-600 cursor-pointer flex justify-center items-center absolute bottom-0 left-0"
                onClick={() => setClicked(true)}
              >
                ▶
              </div>
            )}
          </div>
        </div>
        <p className="mt-[20px] text-[black] font-medium text-[16px]">
          {movie.overview}
        </p>

        <div className="flex gap-4 justify-center mt-4">
          {movie.genres?.map((g) => (
            <span key={g.id} className="text-lg text-green-500 font-semibold">
              {g.name}
            </span>
          ))}
        </div>
        <div className="text-blue-600">{directors}</div>
        <div className="w-full h-[1px] my-[10px] bg-[black]"></div>
        <div className="text-blue-600">{writers}</div>
        <div className="w-full h-[1px] my-[10px] bg-[black]"></div>
        <div className="text-blue-700">{stars}</div>
      </div>
    </div>
  );
};
