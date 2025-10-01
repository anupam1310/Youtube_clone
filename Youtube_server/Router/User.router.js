


import { RegisterUser,LoginUser,LogoutUser } from "../Controller/User.Controller.js";
import { verifyToken } from "../Middleware/verify.js";
function userRouter(app) {
    app.post('/api/register', RegisterUser);
    app.post('/api/verify', verifyToken, VerifyUser);
    app.post('/api/login', LoginUser);
    app.post('/api/user/:id', LogoutUser);

};

export default userRouter;