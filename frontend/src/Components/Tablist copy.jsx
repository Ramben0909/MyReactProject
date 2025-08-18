import { useState, useEffect } from 'react';
import Tab from './Tab'; // Import Tab component
import Spinner from './Spinner'; // Import Spinner component (optional)

const Tablist = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await fetch('/api/movies'); // Replace with your API endpoint
        const data = await res.json();
        setMovies(data);
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
      return (
          <div className="container mx-auto mt-8">
              <Spinner loading={loading} />
          </div>
      );
  }
  
  if (movies.length > 0) {
      return (
          <div className="container mx-auto mt-8">
              <div className="grid grid-cols-3 gap-4">
                  {movies.map((movie, id) => (
                      <Tab
                          key={id}
                          title={movie.title}
                          description={movie.description}
                          studio={movie.studio}
                          year={movie.releasing_year}
                          id = {movie.id}
                      />
                  ))}
              </div>
          </div>
      );
  }
  
  return (
      <div className="container mx-auto mt-8">
          <p>No movies found.</p>
      </div>
  );
};

export default Tablist;
