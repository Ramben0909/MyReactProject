import React, { useState, useEffect } from 'react';
import Tab from './Tab'; // Make sure this path is correct

const MyCart = () => {
  const [cartMovies, setCartMovies] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCartMovies = async () => {
      try {
        const res = await fetch('/api/mycart');
        if (!res.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await res.json();
        console.log('Cart Movies:', data); // Check if data is received
        setCartMovies(data); // Ensure correct access to 'mycart' array
      } catch (err) {
        console.error('Error fetching movies:', err);
      } finally {
        setLoading(false);
      }
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
        <p>Cart is empty</p>
    </div>
);
};

export default MyCart;
