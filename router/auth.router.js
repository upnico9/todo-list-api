import { Router } from 'express';
import { loginUser, createUser } from '../controller/user.controller.js';

const router = Router();

router.post("/login", (req, res) => loginUser(req, res));

router.post("/register", (req, res) => createUser(req, res));

export default router;
