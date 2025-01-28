import { First } from "@/components/First";
import { PopularMovies } from "@/components/PopularMovies";
import { UpcomingMovies } from "@/components/UpcomingMovies";
import { TopRatedMovies } from "@/components/TopRatedMovies";

export default function Home() {
  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      <First />
      <div className="max-w-7xl mx-auto p-4 space-y-12">
        <PopularMovies />
        <UpcomingMovies />
        <TopRatedMovies />
      </div>
    </div>
  );
}
