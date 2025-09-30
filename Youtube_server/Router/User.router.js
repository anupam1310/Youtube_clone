
import { RegisterUser,LoginUser,LogoutUser } from "../Controller/User.Controller";
function userRouter(app) {
    app.post('/api/register', RegisterUser);
    app.post('/api/login', LoginUser);
    app.post('/api/user/:id', LogoutUser);

};

export default userRouter;