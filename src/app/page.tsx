// "use client";

// import { First } from "@/components/layout/header/Header";
// import { UpcomingMovies } from "@/components/body/UpcomingMovies";
// import { TopRatedMovies } from "@/components/body/TopRatedMovies";
// import { PopularMovies } from "@/components/body/PopularMovies";
// import { CarouselDemo } from "@/components/CarouselDemo";

// export default function Home() {
//   return (
//     <div className="bg-black min-h-screen text-white">
//       <First />
//       <CarouselDemo />
//       <div className="max-w-7xl mx-auto p-4 space-y-12">
//         <PopularMovies />
//         <UpcomingMovies />
//         <TopRatedMovies />
//       </div>
//     </div>
//   );
// }
"use client";

import { First } from "@/components/layout/header/Header";
import { CarouselDemo } from "@/components/CarouselDemo";
import { MoviesList } from "@/components/body/MovieList";

export default function Home() {
  return (
    <div className="bg-black min-h-screen text-white">
      <First />
      <CarouselDemo />
      <div className="max-w-7xl mx-auto p-4 space-y-12">
        <MoviesList
          category="popular"
          title="Popular Movies"
          pageUrl="popular"
        />
        <MoviesList
          category="top_rated"
          title="Top Rated Movies"
          pageUrl="toprated"
        />
        <MoviesList
          category="upcoming"
          title="Upcoming Movies"
          pageUrl="upcoming"
        />
      </div>
    </div>
  );
}
