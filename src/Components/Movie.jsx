import React from 'react';
import { Link } from 'react-router-dom';

const Movie = ({ movie }) => {
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-3xl font-bold mb-4">{movie.title}</h1>
      <img src={movie.poster} alt={`${movie.title} Poster`} className="mb-4 w-full h-auto" />
      <p className="text-lg mb-4">
        <strong>Release Year:</strong> {movie.releasing_year}
      </p>
      <p className="text-lg mb-4">
        <strong>Studio:</strong> {movie.studio}
      </p>
      <p className="text-lg mb-4">
        <strong>Description:</strong> {movie.description}
      </p>
      <p className="text-lg mb-4">
        <strong>Director:</strong> {movie.director}
      </p>
      <p className="text-lg mb-4">
        <strong>Producer:</strong> {movie.producer}
      </p>
      <p className="text-lg mb-4">
        <strong>Box Office:</strong> {movie.box_office}
      </p>
      <p className="text-lg mb-4">
        <strong>Plot:</strong> {movie.plot}
      </p>
      <p className="text-lg mb-4">
        <strong>Cast:</strong>
      </p>
      <ul className="list-disc list-inside mb-4">
        {movie.cast.map((actor, index) => (
          <li key={index}>{actor}</li>
        ))}
      </ul>
      <Link
        to="/"
        className="mt-4 text-sm bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
      >
        Back to Home Page
      </Link>
    </div>
  );
};

export default Movie;
