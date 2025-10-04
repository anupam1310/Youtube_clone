


import { RegisterUser,LoginUser,LogoutUser, VerifyUser, getUserNameById } from "../Controller/User.Controller.js";
import  {verifyToken}  from "../Middleware/verify.js";
function userRouter(app) {
    app.post('/api/register', RegisterUser);
    app.get('/api/verify', verifyToken, VerifyUser);
    app.post('/api/login', LoginUser);
    app.post('/api/user/:id', LogoutUser);
    app.get('/api/user/:id', getUserNameById);

};

export default userRouter;