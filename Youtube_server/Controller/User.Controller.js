
import jwt from 'jsonwebtoken';
import UserModel from '../Models/User.model.js';
import bcrypt from 'bcrypt';

export async function RegisterUser(req, res) {
    // Registration logic here
    const { username, email, password, avatar_url } = req.body;
 
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    console.log(existingUser);
    if (existingUser) {
        return res.status(409).json({ message: "User already exists, Login instead" });
    }
    //check email format and password strength by number and special character
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return res.status(400).json({ message: "Invalid email format" });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: "Password must be at least 6 characters long" });
    }
    const numberRegex = /[0-9]/;
    const specialCharRegex = /[!@#$%^&*(),.?":{}|<>]/;
    if (!numberRegex.test(password) || !specialCharRegex.test(password)) {
        return res.status(400).json({ message: "Password must contain at least one number and one special character" });
    }


    
    try {

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword, avatar_url });
        await newUser.save();
        res.status(200).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Error registering user", error });
        
    }
    
}

export async function LoginUser(req, res) {
    // Login logic here
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found, check your email" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials, check your password" });
        }
        const token = jwt.sign({ userId: user._id }, "SecretKey", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
        console.log(error);
    }
}

export function LogoutUser(req, res) {

    const authHeader = req.headers['authorization'];
    const token = authHeader.split(' ')[1];
    if (!token) {
        res.status(200).json({ message: 'Logout successful' });
    }else{
        res.status(200).json({ message: 'Logout unsuccessful' });
    }

};

export async function VerifyUser(req, res) {
    try {
        const userId = req.user.userId;
        const user = await UserModel.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "User verified", user });
    } catch (error) {
        res.status(500).json({ message: "Error verifying user", error });
    }
}
