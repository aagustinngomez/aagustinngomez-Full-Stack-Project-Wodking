import User from '../models/userModel.js'; // Import the model
import bcrypt from 'bcrypt';

// Controller to register a user
export const registerUser = async (req, res) => {
    const { name, email, password, number, gender } = req.body; // Fields come from the form

    try {
        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'User already exists' });
        }

        // Encrypt the password before saving it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create a new user with the received data
        const newUser = new User({
            name,
            email,
            password: hashedPassword, // Save the encrypted password
            number,
            gender,
        });

        // Save the user in the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error });
    }
};