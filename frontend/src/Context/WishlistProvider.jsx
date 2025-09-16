// src/Context/WishlistProvider.jsx
import { useEffect, useState } from "react";
import { WishlistContext } from "./useWishlist";
import { useAuth } from "./useAuth";

const API_BASE = import.meta.env.VITE_BACKEND_URL;


const WishlistProvider = ({ children }) => {
  const { user } = useAuth();
  const [wishlist, setWishlist] = useState([]);

  // Fetch wishlist whenever user logs in/out
  useEffect(() => {
    const fetchWishlist = async () => {
      if (!user?.token) {
        setWishlist([]);
        localStorage.removeItem("wishlist");
        return;
      }

      try {
        const res = await fetch(`${API_BASE}/wishlist`, {
          headers: { Authorization: `Bearer ${user.token}` },
        });

        if (!res.ok) throw new Error("Failed to fetch wishlist");

        const data = await res.json();
        setWishlist(data);
        localStorage.setItem("wishlist", JSON.stringify(data));
      } catch (err) {
        console.error("Wishlist fetch error:", err.message);
        setWishlist([]); // safe fallback
      }
    };

    fetchWishlist();
  }, [user]);

  // Add to wishlist (calls backend then updates context)
  // Inside WishlistProvider.jsx
const addToWishlist = async (movie) => {
  if (!user?.token) throw new Error("Not authenticated");

  const alreadyExists = wishlist.some(
    (m) => Number(m.movieId) === Number(movie.movieId ?? movie.id)
  );
  if (alreadyExists) {
    return { status: "exists", movie }; // ✅ standardized return
  }

  const payload = {
    movieId: movie.movieId ?? movie.id,
    title: movie.title,
    overview: movie.overview,
    poster_path: movie.poster_path,
    release_date: movie.release_date,
    popularity: movie.popularity,
    vote_average: movie.vote_average,
  };

  try {
    const res = await fetch(`${API_BASE}/wishlist`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${user.token}`,
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || "Failed to add to wishlist");
    }

    const newItem = await res.json();
    setWishlist((prev) => [newItem, ...prev]);
    localStorage.setItem("wishlist", JSON.stringify([newItem, ...wishlist]));
    return { status: "added", movie: newItem }; // ✅ standardized return
  } catch (err) {
    console.error("Add to wishlist error:", err.message);
    return { status: "error", error: err.message };
  }
};


  // Remove from wishlist (optimistic UI, revert on error)
  // WishlistProvider.jsx
const removeFromWishlist = async (movieId) => {
  if (!user?.token) {
    return { status: "unauthenticated" }; // no alert anymore
  }

  const targetId = Number(movieId);
  const previous = [...wishlist];
  const updated = previous.filter((m) => Number(m.movieId) !== targetId);

  setWishlist(updated);
  localStorage.setItem("wishlist", JSON.stringify(updated));

  try {
    const res = await fetch(`${API_BASE}/wishlist/${movieId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    });

    if (!res.ok) {
      // revert if failed
      setWishlist(previous);
      localStorage.setItem("wishlist", JSON.stringify(previous));
      const errBody = await res.json().catch(() => ({}));
      throw new Error(errBody.message || "Failed to delete from wishlist");
    }

    const resp = await res.json();
    return { status: "removed", movieId: targetId, resp };
  } catch (err) {
    console.error("Remove from wishlist error:", err.message);
    return { status: "error", error: err.message };
  }
};

  return (
    <WishlistContext.Provider
      value={{ wishlist, setWishlist, addToWishlist, removeFromWishlist }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export default WishlistProvider;
