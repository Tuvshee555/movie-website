"use client";
import { First } from "@/components/First";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";



// useparamsss !!!

interface Gener {
  id: number;
  key: string;
  name: string;
  image_path: string;
}

export default function Home() {
  const [genres, setGenres] = useState<Gener[] | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(true);
  const router = useRouter();

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
      setGenres(response.data.genres);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGenres();
  }, []);

//   const fetchMovies = async () => {
//     const response = await axios.get(`${TMDB_BASE_URL}/search/movie?query=${searchValue}&language=en-US&page=${page}`)
//   }




  if(error) return <div className="flex justify-center">Error: {error}</div>
  if(loading) return <div className="flex justify-center">Loading</div>

  return (
    <>
      <First />
      <button
        className="flex m-auto border-2 border-black bg-[red]"
        onClick={() => router.back()}
      >
        back
      </button>
      <div className="w-screen h-screen ">
        {genres?.map((genres: Gener) => (
          <div key={genres.id} className="bg-gray">
            <h1 className="text-black">{genres.name}</h1>
          </div>
        ))}
      </div>
      <div>

      </div>
      
    </>
  );
}

// "use client";
// import { First } from "@/components/First";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { useRouter } from "next/navigation";

// interface Genre {
//   id: number;
//   name: string;
// }

// export default function Home() {
//   const [genres, setGenres] = useState<Genre[] | null>(null);
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const router = useRouter();

//   const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
//   const TMDB_BASE_URL = process.env.NEXT_PUBLIC_TMDB_BASE_URL;

//   const fetchGenres = async () => {
//     try {
//       const response = await axios.get(`${TMDB_BASE_URL}/genre/movie/list`, {
//         params: {
//           language: "en-US",
//           api_key: API_KEY,
//         },
//       });

//       setGenres(response.data.genres); // ✅ Correct key
//     } catch (error: any) {
//       setError(error.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     fetchGenres();
//   }, []);

//   if (loading) return <h1>Loading...</h1>;
//   if (error) return <h1>Error: {error}</h1>;

//   return (
//     <>
//       <First />
//       <div className="w-[80%] min-h-screen bg-green-500 p-6">
//         <h1 className="text-2xl font-bold mb-4">Genres</h1>
//         <div className="flex flex-wrap gap-4">
//           {genres?.map((genre) => (
//             <div key={genre.id} className="bg-white p-3 rounded-lg shadow-md">
//               <h2 className="text-lg font-semibold">{genre.name}</h2>
//             </div>
//           ))}
//         </div>
//       </div>

//       <button
//         className="flex justify-center border-2 p-2 mt-4"
//         onClick={() => router.back()}
//       >
//         Back
//       </button>
//     </>
//   );
// }
