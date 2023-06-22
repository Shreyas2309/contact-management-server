import express from 'express'
import { currentUser, loginUser, registerUser } from '../controller/usersController.js';
import { validateToken } from '../middleware/validateTokenHandler.js';

const router = express.Router();

router.post('/register', registerUser)

router.post('/login', loginUser)

router.get('/current', validateToken, currentUser)

export default router;