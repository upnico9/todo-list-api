import User from '../models/user.model.js';
import jwt from 'jsonwebtoken';

export async function createUser(req, res) {
    try {
        const { login, password } = req.body;

        console.log(login, password);

        const user = await User.create(login, password);
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