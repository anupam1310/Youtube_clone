import jwt from "jsonwebtoken";
// Middleware to verify JWT token
export function verifyToken(req, res, next) {

    const authHeader = req.headers['authorization'];
    // Bearer tokenString
    // const token = authHeader && authHeader.split(' ')[1];
    const token = (authHeader.split(" ")[0] === "BEARER" && authHeader) && authHeader.split(' ')[1];
    if (!token) {
        return res.sendStatus(401);
    }
    jwt.verify(token, "SecretKey", (err, user) => {
        if (err) {
            return res.sendStatus(403);
        }
        req.user = user;
        console.log("token verified"+ ` User ID: ${user.id}`);
        next();
    });
}