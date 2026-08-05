import React from 'react';
// Make sure this path correctly points to where your Tablist file is located!
import Tablist from '../components/Tablist'; 

const MovieStreamer = () => {
  return (
    <div className="min-h-screen bg-gray-50 pt-8 pb-12">
      <div className="container mx-auto px-4">
        
        {/* You can add a custom header or any other elements for this specific page */}
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
            Movie Streamer
          </h1>
          <p className="text-gray-600">
            Discover popular movies, search your favorites, and see where to watch them.
          </p>
        </div>

        {/* This simply drops your entire functional movie grid right here */}
        <Tablist />
        
      </div>
    </div>
  );
};

export default MovieStreamer;