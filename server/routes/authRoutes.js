import express from 'express';
import { registerUser, loginUser } from '../controllers/authController.js';
import multer from 'multer';

const router = express.Router();

// File upload middleware (multer)
const upload = multer({ dest: 'uploads/' });

// Routes
router.post('/register', upload.single('profilePhoto'), registerUser);
router.post('/login', loginUser);


export default router;
