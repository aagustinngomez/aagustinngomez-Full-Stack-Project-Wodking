import express from 'express';
import User from '../models/userModel.js';

const router = express.Router();

// Route to register a user
router.post('/register', async (req, res) => {
    const { name, email, password, number, gender } = req.body;

    try {
        const newUser = new User({
            name,
            email,
            password,  // In production, encrypt the password before saving it
            number,
            gender,
        });

        await newUser.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(400).json({ message: 'Error registering user', error });
    }
});

export default router;