import User from "../model/signup.js";
import createError from "../utils.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
    try {
        const { email, password, confirmPassword } = req.body;

        // Check if all fields are provided
        if (!email || !password || !confirmPassword) {
            return next(createError('All fields are required', 400));
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return next(createError('Passwords do not match', 400));
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return next(createError('User already exists!', 400));
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 12);

        // Create the new user
        const newUser = await User.create({ 
            ...req.body,
            password: hashedPassword,
        });

        // Generate JWT token
        const token = jwt.sign({ _id: newUser._id }, 'secretkey123', { expiresIn: '90d' });

        res.status(201).json({
            status: 'success',
            message: 'User registered successfully',
            token,
        });
    } catch (error) {
        next(error);
    }
};

// Login
export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // Check if all fields are provided
        if (!email || !password) {
            return next(createError('All fields are required', 400));
        }

        // Find user by email
        const user = await User.findOne({ email });
        if (!user) {
            return next(createError('User not found', 404));
        }

        // Check if password is correct
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return next(createError('Invalid password', 401));
        }

        // Generate JWT token
        const token = jwt.sign({ _id: user._id }, 'secretkey123', { expiresIn: '90d' });

        res.status(200).json({
            status: 'success',
            message: 'Login successful',
            token,
        });
    } catch (error) {
        next(error);
    }
};
`   `