import { useState, useEffect } from 'react';
import Tab from './Tab';

const MyCart = () => {
  const [cartMovies, setCartMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartMovies = () => {
      const storedMovies = JSON.parse(localStorage.getItem('myWatchlist')) || [];
      setCartMovies(storedMovies);
      setLoading(false);
    };

    fetchCartMovies();
  }, []);

  if (cartMovies.length > 0) {
    return (
      <div className="container mx-auto mt-8">
        {loading ? <p>Loading...</p> : null}
        <div className="grid grid-cols-3 gap-4">
          {cartMovies.map((movie, id) => (
            <Tab
              key={id}
              title={movie.title}
              description={movie.description}
              studio={movie.studio}
              year={movie.year}
              id={movie.id}
              poster={movie.poster}
              showRemove={true} // 👈 show Remove button only in MyCart
            />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto mt-8">
      <p className="text-center text-gray-500">Your watchlist is empty.</p>
    </div>
  );
};

export default MyCart;
