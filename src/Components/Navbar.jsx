import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-white text-lg font-bold">Navbar</Link>
        </div>
        <div className="flex items-center">
          <Link to="/" className="text-gray-300 hover:text-white px-3 py-2">Home</Link>
          <Link to="/about" className="text-gray-300 hover:text-white px-3 py-2">About</Link>
          <Link to="/services" className="text-gray-300 hover:text-white px-3 py-2">Services</Link>
          <Link to="/contacts" className="text-gray-300 hover:text-white px-3 py-2">Contact</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
