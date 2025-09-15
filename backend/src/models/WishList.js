import mongoose from "mongoose";

const wishlistSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    movieId: { type: Number, required: true }, 
    title: { type: String, required: true },
    overview: { type: String },
    poster_path: { type: String },
    release_date: { type: String },
    popularity: { type: Number },
    vote_average: { type: Number },
  },
  { timestamps: true }
);

const Wishlist = mongoose.model("Wishlist", wishlistSchema);

export default Wishlist;
