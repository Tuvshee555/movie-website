"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { Movie } from "@/type";

const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;
const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

interface MovieDetail {
  vote_average?: number;
  overview?: string;
}

export const CarouselItem = (props: Movie) => {
  const { id, title, backdrop_path, overview, vote_average } = props;
  const [movieDetail, setMovieDetail] = useState<MovieDetail>({});

  const fetchExplain = async () => {
    try {
      const { data } = await axios.get(`${TMDB_BASE_URL}/movie/${id}`, {
        params: {
          language: "en-US",
          api_key: API_KEY,
        },
      });
      setMovieDetail(data);
    } catch (error: any) {
      console.error("Error fetching movie details:", error.message);
    }
  };

  useEffect(() => {
    fetchExplain();
  }, [id]);

  console.log(movieDetail);

  return (
    <div className="relative">
      <img
        src={`${TMDB_IMAGE_URL}/original${backdrop_path}`}
        alt={title}
        className="h-[600px] w-[100%] object-cover"
      />
      <h1 className="absolute bottom-10 left-10 text-[white] bg-black bg-opacity-50">
        {movieDetail?.vote_average}
      </h1>
      <h1 className="absolute bottom-20 left-20">{overview}</h1>
    </div>
  );
};