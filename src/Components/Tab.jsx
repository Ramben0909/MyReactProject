import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tab = ({ title, studio, year, description, id, poster }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  const addToWatchlist = (movieId) => {
    // Logic to add movie to the watchlist
    console.log(`Adding movie with ID ${movieId} to watchlist`);
  };

  return (
    <div className="bg-gray-900 text-white rounded-md p-4 border border-gray-700 shadow-lg transform transition duration-300 hover:scale-105 w-64 mx-auto">
      {poster && (
        <div className="mb-2 w-full overflow-hidden rounded">
          <img src={poster} alt={`${title} poster`} className="w-full h-64 object-cover rounded" />
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm mb-2">{studio}</p>
      <p className="text-sm mb-2">{year}</p>
      <p>{description.slice(0, showMore ? description.length : 50)}</p>
      {description.length > 50 && (
        <button
          className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          onClick={toggleShowMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
      <div className="flex items-center justify-center mt-4">
        <Link
          to={`/movies/${id}`}
          className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded mr-2"
        >
          About
        </Link>
        <button
          className="text-sm bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
          onClick={() => addToWatchlist(id)}
        >
          Add to Watchlist
        </button>
      </div>
    </div>
  );
};

Tab.propTypes = {
  title: PropTypes.string,
  studio: PropTypes.string,
  year: PropTypes.number,
  description: PropTypes.string,
  id: PropTypes.string.isRequired, 
  poster: PropTypes.string 
};

export default Tab;
