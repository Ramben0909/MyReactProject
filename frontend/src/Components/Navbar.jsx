import React from 'react';
import { Link } from 'react-router-dom'; // Assuming you're using react-router-dom

const Navbar = () => {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleHover = () => {
    setIsHovered(true);
  };

  const handleLeave = () => {
    setIsHovered(false);
  };

  return (
    <nav
      className={`bg-gray-800 p-4 flex justify-between items-center ${isHovered ? 'h-14' : 'h-10'}`} // Dynamic height based on hover state
      onMouseEnter={handleHover}
      onMouseLeave={handleLeave}
      // Add a unique ID for easier debugging (optional)
      id="my-navbar"
    >
      <div className="container mx-auto flex justify-start items-center">
        <div className="flex items-center">
          <Link to="/" className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2">Home</Link>
          <Link to="/about" className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2">About</Link>
          <Link to="/services" className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2">Services</Link>
          <Link to="/contacts" className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2">Contact</Link>
          <Link to="/cart" className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2">MyWatchList</Link>
        </div>
      </div>
      {/* <div className="flex items-center">
        <Link to="/login" className="text-gray-300 hover:bg-gray-700 text-white px-3 py-2">Log In</Link>
      </div> */}
    </nav>
  );
  
};

export default Navbar;
