// "use client";
// import { useEffect, useState } from "react";
// import { useParams } from "next/navigation";
// import axios from "axios";
// import { Languages } from "lucide-react";
// import { log } from "console";

// interface Gener {
//   id: number;
//   key: string;
// }

// export const Gener = () => {
//   const [movie, setMovie] = useState<Gener | null>(null);
//   const [error, setError] = useState<Gener | null>(null);
//   const [loading, setLoading] = useState(true);
//   const { movieId } = useParams();

//   const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

//   const fetchMovie = async () => {
//     try {
//       const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
//         params: {
//           language: "en-US",
//           api_key: API_KEY,
//         },
//       });

//       return response.data as Gener;
//     } catch (error: any) {
//       setError(error.message);
//       return null;
//     } finally {
//       setLoading(false);
//     }
//   };
//   useEffect(() => {
//     const loadMovie = async () => {
//       setLoading(true);
//       const data = await fetchMovie();
//       console.log(data);
//       setMovie(data);
//       setLoading(false);
//     };
//     if (movieId) loadMovie();
//   }, [movieId]);

//   if (loading) return <h1>Loading</h1>;

//   if (error) return <h1>Error</h1>;
//   return <div className=""></div>;
// };
"use client";
import { useEffect, useState } from "react";
import axios from "axios";

interface Genre {
  id: number;
  name: string;
}

export const Gener = () => {
  const [genres, setGenres] = useState<Genre[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
  const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

  const fetchGenres = async () => {
    try {
      const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
        params: {
          language: "en-US",
          api_key: API_KEY,
        },
      });

      setGenres(response.data.genres); // Set the correct data
    } catch (error: any) {
      setError(error.message); // Fixed typo: "messege" → "message"
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres(); // Fetch genres when the component mounts
  }, []);

  if (loading) return <h1>Loading...</h1>;
  if (error) return <h1>Error: {error}</h1>;

  return (
    <div className="text-white">
      <h2 className="text-xl font-bold">Movie Genres</h2>
      <ul>
        {genres?.map((genre) => (
          <li key={genre.id} className="text-gray-300">
            {genre.name}
          </li>
        ))}
      </ul>
    </div>
  );
};




//   return (
//     <div className="text-white p-4">
//       <h2 className="text-lg font-bold mb-2">Genres:</h2>
//       <div className="flex gap-2 flex-wrap">
//         {genres.length > 0 ? (
//           genres.map((genre) => (
//             <span
//               key={genre.id}
//               className="px-3 py-1 bg-gray-700 text-white rounded-md"
//             >
//               {genre.name}
//             </span>
//           ))
//         ) : (
//           <p>No genres available.</p>
//         )}
//       </div>
//     </div>
//   );
// };
