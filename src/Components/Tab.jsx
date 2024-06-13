import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Tab = ({ title = "This is title", studio, year, description }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(prevShowMore => !prevShowMore);
  };

  return (
    <div className="bg-gradient-to-r from-pink-500 via-red-500 to-yellow-500 hover:from-pink-600 hover:via-red-600 hover:to-yellow-600 text-white rounded-md p-4 border border-pink-700 shadow-lg transform transition duration-300 hover:scale-105">
      <h3 className="text-lg font-bold mb-2">{title}</h3>
      <h2 className="text-sm font-semibold mb-2">{studio}</h2>
      <h1 className="text-sm mb-2">{year}</h1>
      <p>{description.slice(0, showMore ? description.length : 50)}</p>
      {description.length > 50 && (
        <button className="mt-2 text-sm bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded" onClick={toggleShowMore}>
          {showMore ? 'Show Less' : 'Show More'}
        </button>
      )}
    </div>
  );
};

Tab.propTypes = {
  title: PropTypes.string
};

export default Tab;
