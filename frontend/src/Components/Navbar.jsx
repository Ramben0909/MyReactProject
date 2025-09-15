import { Link } from "react-router-dom";
import { useAuth } from "../Context/useAuth";

const Navbar = () => {
  const { user } = useAuth();

  return (
    <nav className="flex justify-between items-center px-6 py-3 bg-gray-800 text-white">
      <div className="flex gap-6">
        <Link to="/">Home</Link>
        <Link to="/about">About</Link>
        <Link to="/contacts">Contacts</Link>
        <Link to="/cart">My Watchlist</Link>
      </div>

      <div className="ml-auto">
        {user ? (
          <Link
            to="/profile"
            className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
          >
            {user.name}
          </Link>
        ) : (
          <div className="flex gap-3">
            <Link
              to="/signup"
              className="bg-blue-600 px-4 py-2 rounded hover:bg-blue-700"
            >
              Signup/Login
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
