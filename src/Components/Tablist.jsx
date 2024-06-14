import React, { useState, useEffect } from 'react';
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

  return (
    <div className="container mx-auto mt-8">
      {loading ? (
        <Spinner loading={loading} /> // Assuming Spinner component displays a loading indicator
      ) : (
        movies.length > 0 ? ( // Check if movies have data before rendering
          <div className="grid grid-cols-3 gap-4">
            {movies.map((movie, index) => (
              <Tab
                key={movie.id}
                title={movie.title}
                description={movie.description}
                studio={movie.studio}
                year={movie.releasing_year}
              />
            ))}
          </div>
        ) : (
          <p>No movies found.</p> // Optional: Display a message if no movies are fetched
        )
      )}
    </div>
  );
};

export default Tablist;
