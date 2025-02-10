"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import axios from "axios";

export function CarouselDemo() {
  const [Movie, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    backdrop_path: string;
  }

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    axios
      .get(`${TMDB_BASE_URL}/movie/popular`, {
        params: {
          language: "en-US",
          api_key: API_KEY,
        },
      })
      .then((response) => setMovies(response.data.results))
      .catch((error) => {
        setError(error.massage);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="text-center">Loading PHOTOS</div>;

  if (error) return <div className="text-center text-red">ERRORING!!!!</div>;

  return (
    <div className="bg-[red] h-[600px] w-[100%] flex justify-center z-[1]">
      <Swiper
        modules={[Autoplay]}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        loop={true}
        className="w-[full]"
      >
        {Movie.map((movie: Movie) => (
          <SwiperSlide key={movie.id}>
            <img
              src={`${TMDB_IMAGE_URL}/original${movie.backdrop_path}`}
              alt={movie.title}
              className="h-[600px] w-[100%] object-cover"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
