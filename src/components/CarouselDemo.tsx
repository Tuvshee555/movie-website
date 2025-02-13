"use client";
import { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/autoplay";
import axios from "axios";
import { CarouselItem } from "./CarouselItem";
import { Movie } from "@/type";


const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

export function CarouselDemo() {
  const [Movie, setMovies] = useState<Movie[]>([]);

  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const { data } = await axios.get(`${TMDB_BASE_URL}/movie/popular`, {
          params: { language: "en-US", api_key: API_KEY },
        });
        setMovies(data.results);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
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
            <CarouselItem {...movie} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
