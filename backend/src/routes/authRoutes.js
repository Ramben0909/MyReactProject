import express from 'express';
import { signupUser, loginUser } from '../controllers/authController.js';

const router = express.Router();

// Route to register user
router.post('/signup', signupUser);

// Route to login user
router.post('/login', loginUser);

export default router;
