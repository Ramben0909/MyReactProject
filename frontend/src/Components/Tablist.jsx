import { useState, useEffect } from 'react';
import axios from 'axios';
import Tab from './Tab'; // Import Tab component
import Spinner from './Spinner'; // Import Spinner component (optional)

const Tablist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const fetchMovies = async (query) => {
    setLoading(true);
    try {
      const res = await axios.get(`https://www.omdbapi.com/?s=${query}&apikey=2eed2652`);
      if (res.data.Search) {
        console.log(res.data.Search);
        setMovies(res.data.Search);
      } else {
        setMovies([]);
      }
    } catch (err) {
      console.error('Error fetching movies:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      fetchMovies(searchTerm);
    }
  };

  useEffect(() => {
    fetchMovies('movie'); 
  }, []);

  return (
    <div className="container mx-auto mt-8">
      <form onSubmit={handleSearch} className="mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search for movies..."
          className="border p-2 mr-2"
        />
        <button type="submit" className="p-2 bg-blue-500 text-white">Search</button>
      </form>
      
      {loading ? (
        <Spinner loading={loading} />
      ) : movies.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-3">
          {movies.map((movie) => (
            <Tab
              key={movie.imdbID}
              title={movie.Title}
              description={movie.Type}
              studio={movie.Type}
              year={parseInt(movie.Year, 10)}
              id={movie.imdbID}
              poster={movie.Poster} 
            />
          ))}
        </div>
      ) : (
        <p>No movies found.</p>
      )}
    </div>
  );
};

export default Tablist;
