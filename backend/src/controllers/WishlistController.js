import Wishlist from "../models/WishList.js";

// ➕ Add movie to wishlist
export const addToWishlist = async (req, res) => {
  try {
    const { movieId, title, overview, poster_path, release_date, popularity, vote_average } = req.body;

    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const exists = await Wishlist.findOne({ user: req.user.id, movieId });
    if (exists) {
      return res.status(400).json({ message: "Movie already in wishlist" });
    }

    const wishlistItem = new Wishlist({
      user: req.user.id,
      movieId,
      title,
      overview,
      poster_path,
      release_date,
      popularity,
      vote_average,
    });

    await wishlistItem.save();
    res.status(201).json(wishlistItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// 📄 Get wishlist for logged-in user
export const getWishlist = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const wishlist = await Wishlist.find({ user: req.user.id });
    res.json(wishlist);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ❌ Remove movie from wishlist
export const removeFromWishlist = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(401).json({ message: "Unauthorized: User not logged in" });
    }

    const { id } = req.params;
    const deleted = await Wishlist.findOneAndDelete({ user: req.user.id, movieId: id });

    if (!deleted) {
      return res.status(404).json({ message: "Movie not found in wishlist" });
    }

    res.json({ message: "Movie removed from wishlist", deleted });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
