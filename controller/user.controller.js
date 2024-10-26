import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

export async function createUser(req, res) {
    try {
        const { login, password } = req.body;

        console.log(login, password);
        if (!login || !password) {
            return res.status(400).json({message: 'Invalid input'});
        }

        const encryptedPassword = await bcrypt.hash(password, 10);

        const user = await User.create(login, encryptedPassword);
        console.log("User created: ", user);
        res.json(user);
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}

export async function loginUser(req, res) {
    try {
        const { login, password } = req.body;
        if (!login || !password) {
            return res.status(400).json({message: 'Invalid input'});
        }

        const user = await User.comparePassword(login, password);
        if (!user) {
            return res.status(401).json({message: 'Invalid email or password'});
        }

        const token = jwt.sign({login: login}, 'secretkey', {expiresIn: '1h'});
        res.json({token});
    } catch (error) {
        console.log(error);
        res.status(500).json({message: error});
    }
}