import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

export function CarouselDemo() {
  const [Photo, setMoviePhoto] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  const fetchMovies = async () => {
    try {
      const response = await fetch(
        `${TMDB_BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );

      if (!response.ok) {
        throw new Error("FAILING TO FIND PHOTOS");
      }

      const data = await response.json();
      console.log(data);
      return data.results;
    } catch (error) {
      setError(error.message);
      return [];
    }
  };
  // console.log("CAROUSELDEMO");

  useEffect(() => {
    const LoadMovies = async () => {
      setLoading(true);
      const data = await fetchMovies();
      setMoviePhoto(data);
      setLoading(false);
    };

    LoadMovies();
  }, []);

  if (loading) {
    return <div className="text-center">Loading PHOTOS</div>;
  }
  if (error) {
    return <div className="text-center">ERRORING!!!!</div>;
  }

  return (
    <div className="bg-[red] h-[600px] w-sreen">
      <Carousel className="w-full max-w-xs">
        <CarouselContent>
          {Photo.map((movie) => (
            <div key={movie.id} className="bg-[white] dark:bg-gray-800">
              <img
                src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
                alt={movie.title}
                className="w-[600px] h-[100%]"
              />
            </div>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
