
import jwt from 'jsonwebtoken';
import UserModel from '../Model/User.Model.js';
import bcrypt from 'bcrypt';

export async function RegisterUser(req, res) {
    // Registration logic here
    const { username, email, password, avatar_url } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new UserModel({ username, email, password: hashedPassword, avatar_url });
        await newUser.save();
        res.status(201).json({ message: "User registered successfully", user: newUser });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
    
}

export async function LoginUser(req, res) {
    // Login logic here
    const { email, password } = req.body;
    try {
        const user = await UserModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = jwt.sign({ userId: user._id }, "SecretKey", { expiresIn: "1h" });
        res.status(200).json({ message: "Login successful", token });
    } catch (error) {
        res.status(500).json({ message: "Error logging in" });
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
