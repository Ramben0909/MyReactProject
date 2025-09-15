import express from "express";
import { addToWishlist, getWishlist, removeFromWishlist } from "../controllers/WishlistController.js";
// You’ll need auth middleware to protect these routes
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// All routes require auth
router.post("/", authMiddleware, addToWishlist);
router.get("/", authMiddleware, getWishlist);
router.delete("/:id", authMiddleware, removeFromWishlist);

export default router;
