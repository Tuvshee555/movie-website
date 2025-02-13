"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import axios from "axios";

export function CarouselDemo() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [explain, setExplain] = useState<{ [key: number]: string }>({});
  const [rating, setRating] = useState<{ [key: number]: number }>({});
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
    overview: string;
  }

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
          params: { language: "en-US", api_key: API_KEY },
        });

        setMovies(data.results);

        // Fetch explanations one by one
        const explanationsData: { [key: number]: string } = {};
        const ratingsData: { [key: number]: number } = {};

        for (const movie of data.results) {
          try {
            const response = await axios.get(`${TMDB_BASE_URL}/movie/${movie.id}`, {
              params: { language: "en-US", api_key: API_KEY },
            });

            explanationsData[movie.id] = response.data.overview;
            ratingsData[movie.id] = response.data.vote_average;
            setExplain({ ...explanationsData });
            setRating({ ...ratingsData });
          } catch (err) {
            console.error(`Error fetching explanation for movie ${movie.id}`);
          }
        }
      } catch (error: unknown) {
        if (error instanceof Error) setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <div className="text-center">Loading PHOTOS</div>;
  if (error) return <div className="text-center text-red-500">ERROR: {error}</div>;

  return (
    <div className="bg-red-500 h-[600px] w-[100%] flex justify-center z-[1]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        loop={true}
        className="w-full"
      >
        {movies.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <div className="relative">
              <img
                src={`${TMDB_IMAGE_URL}/original${movie.backdrop_path}`}
                alt={movie.title}
                className="h-[600px] w-[100%] object-cover"
              />
              <h1 className="absolute bottom-10 left-10 text-white bg-black bg-opacity-50 p-2">
                {explain[movie.id]}
              </h1>
              <h1 className="absolute bottom-20 left-10 text-yellow-300 text-lg font-bold">
                ⭐ {rating[movie.id]}/10
              </h1>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
