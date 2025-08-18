import { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const Tab = ({ title = 'Untitled', studio = 'Unknown Studio', year, description = '', id, poster, showRemove = false }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore((prevShowMore) => !prevShowMore);
  };

  const addToWatchlist = () => {
    const movie = { id, title, studio, year, description, poster };
    const existingList = JSON.parse(localStorage.getItem('myWatchlist')) || [];
    const isAlreadyAdded = existingList.some((item) => item.id === movie.id);
    if (!isAlreadyAdded) {
      existingList.push(movie);
      localStorage.setItem('myWatchlist', JSON.stringify(existingList));
      alert('Movie added to watchlist!');
    } else {
      alert('Movie is already in watchlist.');
    }
  };

  const removeFromWatchlist = () => {
    const existingList = JSON.parse(localStorage.getItem('myWatchlist')) || [];
    const updatedList = existingList.filter((movie) => movie.id !== id);
    localStorage.setItem('myWatchlist', JSON.stringify(updatedList));
    alert('Movie removed from watchlist.');
    window.location.reload(); // optional: can replace with state lifting later
  };

  return (
    <div className="bg-gray-900 text-white rounded-md p-4 border border-gray-700 shadow-lg transform transition duration-300 hover:scale-105 w-64 mx-auto">
      {poster && (
        <div className="mb-2 w-full overflow-hidden rounded">
          <img
            src={poster}
            alt={`${title} poster`}
            className="w-full object-cover rounded"
            style={{ height: '16rem' }}
          />
        </div>
      )}
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <p className="text-sm mb-2">{studio}</p>
      {year && <p className="text-sm mb-2">{year}</p>}
      <p>
        {description.slice(0, showMore ? description.length : 50)}
        {description.length > 50 && '...'}
      </p>
      {description.length > 50 && (
        <button
          className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded"
          onClick={toggleShowMore}
        >
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
      <div className="flex items-center justify-center mt-4 gap-2 flex-wrap">
        <Link
          to={`/movies/${id}`}
          className="text-sm bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded"
        >
          About
        </Link>
        <button
          className="text-sm bg-purple-500 hover:bg-purple-600 text-white py-1 px-3 rounded"
          onClick={addToWatchlist}
        >
          Add to Watchlist
        </button>
        {showRemove && (
          <button
            className="text-sm bg-red-500 hover:bg-red-600 text-white py-1 px-3 rounded"
            onClick={removeFromWatchlist}
          >
            Remove
          </button>
        )}
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
  poster: PropTypes.string,
  showRemove: PropTypes.bool, // New prop
};

export default Tab;
