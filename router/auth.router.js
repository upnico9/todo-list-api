import { Router } from 'express';
import { loginUser, createUser } from '../controller/user.controller.js';
import { authenticate } from '../middleware/auth.js';
const router = Router();

router.post("/login", (req, res) => loginUser(req, res));

router.post("/register", (req, res) => createUser(req, res));

export default router;
