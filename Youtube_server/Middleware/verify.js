import jwt from "jsonwebtoken";
import UserModel from "../Models/User.model.js";
// Middleware to verify JWT token
export function verifyToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    // Bearer tokenString
    // const token = authHeader && authHeader.split(' ')[1];
    const token = (authHeader.split(" ")[0] === "BEARER" && authHeader) && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    // extract payload and verify

    jwt.verify(token, "SecretKey", (err, payload) => {
        if (err) {
            return res.sendStatus(403);
        }
        // payload contains the decoded JWT data
        req.userId = payload.userId;
        console.log(req.userId);
        console.log("token verified"+ ` User ID: ${payload.userId}`);
        next();
    });
}