import { useState, useEffect } from "react";
import axios from "axios";
import Fuse from "fuse.js";
import Tab from "./Tab";
import Spinner from "./Spinner";
import { useWishlist } from "../Context/useWishlist";
import { useAuth } from "../Context/useAuth";
import toast from "react-hot-toast";

const Tablist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);
  const { addToWishlist } = useWishlist();
  const { user } = useAuth();

  const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
  const BASE_URL = import.meta.env.VITE_TMDB_BASE_URL;
  const IMAGE_BASE = import.meta.env.VITE_TMDB_IMAGE_BASE;

  const fuseOptions = { keys: ["title"], threshold: 0.4 };

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}&language=en-US&page=1&include_adult=false`
      );
      let results = res.data.results || [];
      results.sort((a, b) => b.popularity - a.popularity);

      if (results.length === 0 && query) {
        const fuse = new Fuse(movies, fuseOptions);
        results = fuse.search(query).map((r) => r.item);
      }

      setMovies(results);
    } catch (err) {
      console.error("Error fetching movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchPopular = async () => {
    setLoading(true);
    try {
      const res = await axios.get(
        `${BASE_URL}/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
      );
      setMovies(res.data.results || []);
    } catch (err) {
      console.error("Error fetching popular movies:", err);
      setMovies([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) fetchMovies(searchTerm.trim());
  };

  useEffect(() => {
    fetchPopular();
  }, []);

  // ✅ MODIFIED: Added streaming providers fetch to the Promise.all
  const fetchMovieDetails = async (id) => {
    try {
      const [detailsRes, creditsRes, videoRes, providersRes] = await Promise.all([
        axios.get(`${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/${id}/credits?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/${id}/videos?api_key=${API_KEY}&language=en-US`),
        axios.get(`${BASE_URL}/movie/${id}/watch/providers?api_key=${API_KEY}`)
      ]);

      const trailer = videoRes.data.results.find(
        (vid) => vid.type === "Trailer" && vid.site === "YouTube"
      );

      // Extract streaming data for India (IN) first, fallback to US if not available
      const providerData = providersRes.data.results?.IN || providersRes.data.results?.US || {};
      const streamingProviders = providerData.flatrate || [];

      setSelectedMovie({
        ...detailsRes.data,
        cast: creditsRes.data.cast.slice(0, 5),
        trailerKey: trailer ? trailer.key : null,
        providers: streamingProviders, // Added providers to state
      });
    } catch (err) {
      console.error("Error fetching movie details:", err);
      setSelectedMovie(null);
    }
  };

  const handleAddToWishlist = async (movie) => {
    if (!user) {
      toast.error("You must be logged in ❌");
      return;
    }

    const result = await addToWishlist(movie);

    if (result.status === "exists") {
      toast.error(`${movie.title} is already in your wishlist ⚠️`);
    } else if (result.status === "added") {
      toast.success(`${movie.title} added to wishlist 🎉`);
    } else if (result.status === "error") {
      toast.error(`Failed to add: ${result.error}`);
    }
  };

  return (
    <div className="container mx-auto mt-8">
      {/* Search form */}
      <div className="flex gap-4 mb-6">
        <form onSubmit={handleSearch} className="flex">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search for movies..."
            className="border p-2 mr-2"
          />
          <button type="submit" className="p-2 bg-blue-500 text-white">
            Search
          </button>
        </form>
      </div>

      {loading ? (
        <Spinner loading={loading} />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {movies.map((movie) => (
            <Tab
              key={movie.id}
              id={movie.id}
              title={movie.title}
              poster_path={movie.poster_path}
              release_date={movie.release_date}
              IMAGE_BASE={IMAGE_BASE}
              vote_average={movie.vote_average}
              popularity={movie.popularity}
              onShowMore={fetchMovieDetails}
            />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}

      {/* Modal for movie details */}
      {selectedMovie && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-4xl w-full p-6 relative max-h-[90vh] overflow-y-auto">
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
                className="rounded-lg shadow-md md:w-1/3 object-cover"
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

                {/* Where to Watch (Streaming or Theater Fallback) */}
                <div className="mb-4">
                  <h3 className="text-lg font-semibold">Where to Watch:</h3>
                  
                  {selectedMovie.providers?.length > 0 ? (
                    <div className="flex flex-wrap gap-3 mt-2">
                      {selectedMovie.providers.map((provider) => (
                        <div key={provider.provider_id} className="flex flex-col items-center">
                          <img
                            src={`${IMAGE_BASE}/w92${provider.logo_path}`}
                            alt={provider.provider_name}
                            title={provider.provider_name}
                            className="w-10 h-10 rounded-xl shadow-sm border border-gray-200"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="mt-2 flex flex-col sm:flex-row gap-3">
                      <p className="text-sm text-gray-500 flex items-center">
                        Not streaming right now. It might be in theaters!
                      </p>
                      
                      {/* Google Showtimes Deep Link */}
                      <a
                        href={`https://www.google.com/search?q=${encodeURIComponent(selectedMovie.title + " movie showtimes near me")}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-blue-100 text-blue-700 text-sm font-medium rounded hover:bg-blue-200 transition text-center"
                      >
                        🎟️ Theaters Near Me
                      </a>

                      {/* BookMyShow Deep Link */}
                      <a
                        href={`https://in.bookmyshow.com/explore/movies?q=${encodeURIComponent(selectedMovie.title)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 bg-red-100 text-red-700 text-sm font-medium rounded hover:bg-red-200 transition text-center"
                      >
                        🍿 BookMyShow
                      </a>
                    </div>
                  )}
                </div>

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
                  <p className="mt-4 text-gray-500">No preview available.</p>
                )}

                {/* Add to Wishlist button */}
                {user && (
                  <button
                    onClick={() => handleAddToWishlist(selectedMovie)}
                    className="mt-6 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 w-full md:w-auto"
                  >
                    ➕ Add to Wishlist
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tablist;