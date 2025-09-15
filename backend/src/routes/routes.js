import express from "express";
import authRoutes from "./authRoutes.js";
import wishlistRoutes from "./WishlistRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/wishlist", wishlistRoutes);

export default router;
