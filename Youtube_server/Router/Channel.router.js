import { createChannel,getChannelName,getChannelById, getChannelByUserId } from "../Controller/Channel.Controller.js";

import { verifyToken } from "../Middleware/verify.js";

function ChannelRouter(app) {
    app.post('/api/channel/create', verifyToken, createChannel);
    app.get('/api/channel/name/:id', verifyToken, getChannelName);
    app.get('/api/channel/:id', getChannelById);
    app.get('/api/channel/user/:id', verifyToken, getChannelByUserId);

    // console.log("Channel routes set up");
}

export default ChannelRouter;
