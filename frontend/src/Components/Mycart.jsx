import { useState, useEffect } from "react";
import axios from "axios";
import Tab from "./Tab";
import { useWishlist } from "../Context/useWishlist";
import Spinner from "./Spinner";
import toast from "react-hot-toast";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

const MyCart = () => {
  const { wishlist, removeFromWishlist } = useWishlist();
  const [loading, setLoading] = useState(true);
  const [selectedMovie, setSelectedMovie] = useState(null);

  const fetchMovieDetails = async (id) => {
    try {
      const [detailsRes, creditsRes, videoRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
      ]);

      const trailer = videoRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      setSelectedMovie({
        ...detailsRes.data,
        cast: creditsRes.data.cast.slice(0, 5),
        trailerKey: trailer ? trailer.key : null,
      });
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setSelectedMovie(null);
    }
  };

  // Wrap remove handler to include toast
  const handleRemove = async (movieId) => {
  const result = await removeFromWishlist(movieId);

  if (result.status === "unauthenticated") {
    toast.error("Please login to remove items ❌");
  } else if (result.status === "removed") {
    toast.success("Removed from wishlist 🗑️");
  } else if (result.status === "error") {
    toast.error(`Error: ${result.error}`);
  }
};


  useEffect(() => {
    if (wishlist) setLoading(false);
  }, [wishlist]);

  if (loading) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <Spinner loading={loading} />
      </div>
    );
  }

  if (!wishlist || wishlist.length === 0) {
    return (
      <div className="container mx-auto mt-8 text-center">
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
        {wishlist.map((movie) => (
          <Tab
            key={movie._id}
            id={movie.movieId}
            title={movie.title}
            poster_path={movie.poster_path}
            release_date={movie.release_date}
            IMAGE_BASE={IMAGE_BASE}
            vote_average={movie.vote_average}
            popularity={movie.popularity}
            onShowMore={fetchMovieDetails}
            onRemove={handleRemove}
            showRemove={true}
          />
        ))}
      </div>

      {/* Modal for movie details */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative">
            {/* Close Button */}
            <button
              onClick={() => setSelectedMovie(null)}
              className="absolute top-2 right-2 text-xl font-bold text-gray-600 hover:text-black"
            >
              ✖
            </button>

            <div className="flex flex-col md:flex-row gap-6">
              <img
                src={
                  selectedMovie.poster_path
                    ? `${IMAGE_BASE}/w300${selectedMovie.poster_path}`
                    : "https://via.placeholder.com/300x450?text=No+Image"
                }
                alt={selectedMovie.title}
                className="rounded-lg shadow-md"
              />
              <div className="flex-1">
                <h2 className="text-2xl font-bold mb-2">{selectedMovie.title}</h2>
                <p className="text-gray-600 mb-2">
                  Release: {selectedMovie.release_date || "TBA"}
                </p>
                <p className="mb-4">
                  {selectedMovie.overview || "No overview available."}
                </p>

                <h3 className="text-lg font-semibold">Top Cast:</h3>
                <ul className="list-disc ml-5 mb-4">
                  {selectedMovie.cast?.length > 0 ? (
                    selectedMovie.cast.map((actor) => (
                      <li key={actor.id}>
                        {actor.name} as {actor.character}
                      </li>
                    ))
                  ) : (
                    <li>No cast info available</li>
                  )}
                </ul>

                {/* Trailer / Preview */}
                {selectedMovie.trailerKey ? (
                  <div className="mt-4">
                    <iframe
                      width="100%"
                      height="315"
                      src={`https://www.youtube.com/embed/${selectedMovie.trailerKey}`}
                      title="Movie Trailer"
                      frameBorder="0"
                      allowFullScreen
                      className="rounded-lg"
                    ></iframe>
                  </div>
                ) : selectedMovie.backdrop_path ? (
                  <img
                    src={`${IMAGE_BASE}/w780${selectedMovie.backdrop_path}`}
                    alt="Preview"
                    className="rounded-lg mt-4"
                  />
                ) : (
                  <p>No preview available.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyCart;
