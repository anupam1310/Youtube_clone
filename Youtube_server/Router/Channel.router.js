import { createChannel,getChannelName,getChannelById } from "../Controller/Channel.Controller.js";

import { verifyToken } from "../Middleware/verify.js";

function ChannelRouter(app) {
    app.post('/api/channel/create', verifyToken, createChannel);
    app.get('/api/channel/name/:id', verifyToken, getChannelName);
    app.get('/api/channel/:id', verifyToken, getChannelById);
}

export default ChannelRouter;
