// "use client";

// import axios from "axios";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// export const SearchBar = () => {
//   const [selectedMovie, setSelectedMovie] = useState("");
//   const [movies, setMovies] = useState<any[]>([]);
//   const [photos, setPhotos] = useState<string | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(false);
//   const router = useRouter();

//   const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
//   const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

//   useEffect(() => {
//     const fetchMovies = async () => {
//       try {
//         const response = await axios.get(`${TMDB_BASE_URL}/search/movie`, {
//           params: {
//             query: selectedMovie,
//             language: "en-US",
//             api_key: API_KEY,
//           },
//         });
//         setMovies(response.data.results);
//         console.log(response);
//       } catch (error: any) {
//         setError(error.message);
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchMovies();
//   }, [selectedMovie]);

//   if (loading) return <div className="text-blue">Loading ...</div>;
//   if (error) return <div className="text-red">Error{error}</div>;

//   return (
//     <>
//       <div className="z-[5]">
//         <input
//           type="text"
//           placeholder="Search"
//           className="px-4 py-2 rounded-md border-gray-300 dark:border-gray-700 bg-white text-gray-800"
//           value={selectedMovie}
//           onChange={(e) => setSelectedMovie(e.target.value)}
//         />
//         {movies.length === 0 ? (
//           <div></div>
//         ) : (
//           <ul className="absolute bg-gray border-1 mt-1 w-[380px]"
//           >
//             {movies.map((movie) => (
//               <div className="flex">
//                 <img
//                   className="h-[100px] w-[67px]"
//                   src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
//                 />
//                 <li
//                   key={movie.id}
//                   className="text-blue p-2 hover:bg-gray-200 cursor-pointer"
//                   onClick={() => router.push(`/moviecard/${movie.id}`)}
//                 >
//                   {movie.title}
//                 </li>
//               </div>
//             ))}
//           </ul>
//         )}
//       </div>
//     </>
//   );
// };

"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState<any[]>([]);
  const router = useRouter();

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;
  const TMDB_IMAGE_URL = process.env.NEXT_PUBLIC_TMDB_IMAGE_SERVICE_URL;

  useEffect(() => {
    if (!query) return setMovies([]);

    axios
      .get(`${TMDB_BASE_URL}/search/movie`, {
        params: { query, language: "en-US", api_key: API_KEY },
      })
      .then((response) => setMovies(response.data.results || []))
      .catch((error) => console.error(error));
  }, [query]);

  return (
    <div className="z-[5]">
      <input
        type="text"
        placeholder="Search"
        className="px-4 py-2 rounded-md border border-gray-600 bg-black text-white w-[300px]"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />

      {movies.length > 0 && (
        <div className="absolute bg-[#1a1a1a] border border-gray-600 mt-2 w-[380px] rounded-lg shadow-lg p-2 ">
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="flex items-center p-2 rounded-lg hover:bg-gray-800 cursor-pointer justify-between"
              onClick={() => router.push(`/moviecard/${movie.id}`)}
            >
              <div className="flex">
                <img
                  className="h-[90px] w-[60px] rounded-md object-cover mr-3"
                  src={`${TMDB_IMAGE_URL}/w500${movie.poster_path}`}
                  alt={movie.title}
                />
                <div>
                  <span className="text-white font-semibold">
                    {movie.title}
                  </span>
                  <div className="text-gray-400 text-sm">
                    ⭐ {movie.vote_average?.toFixed(1)}/10 •{" "}
                    {movie.release_date?.split("-")[0] || "N/A"}
                  </div>
                </div>
              </div>
              <p className="text-[18px] py-[8px] px-[16] font-[600] hover:underline ">
                {" "}
                See more
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
