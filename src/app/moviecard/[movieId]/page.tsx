"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { First } from "@/components/layout/header/Header";
import { Trailer } from "@/components/Trailer";

interface Movie {
  id: number;
  title: string;
  poster_path?: string;
  vote_average: number;
  overview: string;
  backdrop_path?: string;
  genres: { id: number; name: string }[];
  release_date: string;
  runtime: number;
}

interface CrewMember {
  id: number;
  name: string;
  job: string;
}

export default function MovieCard() {
  const { movieId } = useParams();
  const numericMovieId = Number(movieId);
  const router = useRouter();

  const [movie, setMovie] = useState<Movie | null>(null);
  const [directors, setDirectors] = useState<string[]>([]);
  const [writers, setWriters] = useState<string[]>([]);
  const [stars, setStars] = useState<string[]>([]);
  const [similar, setSimilar] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [clicked, setClicked] = useState(false);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    if (!numericMovieId) return;

    const fetchMovie = async () => {
      try {
        const response = await axios.get<Movie>(
          `${TMDB_BASE_URL}/movie/${numericMovieId}`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );
        setMovie(response.data);
        console.log(response);
      } catch (error) {
        setError((error as { message: string }).message);
      } finally {
        setLoading(false);
      }
    };

    const fetchCredits = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${numericMovieId}/credits`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );

        const crew: CrewMember[] = response.data.crew;
        const cast: CrewMember[] = response.data.cast;

        setDirectors(
          crew.filter((member) => member.job === "Director").map((d) => d.name)
        );
        setWriters(
          crew
            .filter(
              (member) => member.job === "Writer" || member.job === "Screenplay"
            )
            .map((w) => w.name)
        );
        setStars(cast.slice(0, 3).map((s) => s.name));
      } catch (error) {
        setError((error as { message: string }).message);
      }
    };

    const fetchSimilar = async () => {
      try {
        const response = await axios.get(
          `${TMDB_BASE_URL}/movie/${numericMovieId}/similar`,
          {
            params: { api_key: API_KEY, language: "en-US" },
          }
        );
        setSimilar(response.data.results);
      } catch (error) {
        setError((error as { message: string }).message);
      }
    };

    fetchMovie();
    fetchCredits();
    fetchSimilar();
  }, [numericMovieId]);

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
        <div className="flex justify-between">
          <div className="flex">
            <div>
              <h1 className="text-[36px] text-black font-bold">
                {movie.title}
              </h1>
              <h1 className="text-[16px] text-black ">{movie.release_date}</h1>
            </div>
            <h1 className="text-[16px] text-black">{movie.runtime}</h1>
          </div> 
          <h1 className="text-black p-2">{movie.vote_average.toFixed(1)}/10</h1>
        </div>

        <div className="flex gap-8 justify-center mt-4">
          {movie.poster_path ? (
            <img
              src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
              className="rounded-lg h-[430px] w-[288px] object-cover"
              alt={movie.title}
            />
          ) : (
            <div className="w-[288px] h-[430px] bg-gray-400 flex items-center justify-center rounded-lg text-gray-700">
              No Image Available
            </div>
          )}

          <div className="relative">
            {movie.backdrop_path ? (
              <img
                src={`${TMDB_IMAGE_URL}/original${movie.backdrop_path}`}
                className="w-[760px] h-[430px] rounded-lg object-cover"
                alt={movie.title}
              />
            ) : (
              <div className="w-[760px] h-[430px] bg-gray-400 flex items-center justify-center rounded-lg text-gray-700">
                No Image Available
              </div>
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

        <p className="mt-[20px] text-black font-medium text-[16px]">
          {movie.overview}
        </p>

        <div className="flex gap-4 justify-center mt-4">
          {movie.genres?.map((g) => (
            <span key={g.id} className="text-lg text-green-500 font-semibold">
              {g.name}
            </span>
          ))}
        </div>

        <div className="text-blue-600">
          {directors.length
            ? `Director: ${directors.join(", ")}`
            : "Director: Unknown"}
        </div>
        <div className="w-full h-[1px] my-[10px] bg-black"></div>
        <div className="text-blue-600">
          {writers.length
            ? `Writers: ${writers.join(", ")}`
            : "Writers: Unknown"}
        </div>
        <div className="w-full h-[1px] my-[10px] bg-black"></div>
        <div className="text-blue-700">
          {stars.length ? `Stars: ${stars.join(", ")}` : "Stars: Unknown"}
        </div>

        <h1
          className="hover:underline cursor-pointer mt-4 text-[black]"
          onClick={() => router.push(`/more_like/${movieId}`)}
        >
          See More
        </h1>

        <div className="flex justify-center gap-8 mt-4">
          {similar

            .filter((movie) => {
              if (movie.poster_path !== null) {
                return movie.poster_path !== null;
              }
            })
            .slice(0, 5)
            .map((similarMovie) => (
              <div
                key={similarMovie.id}
                onClick={() => router.push(`/moviecard/${similarMovie.id}`)}
                className="cursor-pointer"
              >
                {similarMovie.poster_path ? (
                  <img
                    src={`${TMDB_IMAGE_URL}/w500${similarMovie.poster_path}`}
                    className="w-[190px] h-[281px] rounded-lg"
                    alt={similarMovie.title}
                  />
                ) : (
                  <div className="w-[190px] h-[281px] bg-gray-400 flex items-center justify-center rounded-lg text-gray-700">
                    No Image Available
                  </div>
                )}
                <div className="flex items-center gap-1">
                  <img src="/star.png" className="h-[16px]" />
                  <h1>{similarMovie.vote_average.toFixed(1)}</h1>
                </div>
                <h1>{similarMovie.title}</h1>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
