import React from 'react';
import {Link} from 'react-router-dom';
import {FaExclamationTriangle} from 'react-icons/fa'

const NotFound = () => {
  return (
    <div className="container mx-auto mt-8 p-4">
       <FaExclamationTriangle className="text-6xl text-red-500" /> 
      <h1 className="text-3xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-lg">
        Oops! The page you are looking for doesn't exist.
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-4">
          <Link to="/" className="text-white">Go back</Link>
        </button>
      </p>
    </div>
  );
}

export default NotFound;
