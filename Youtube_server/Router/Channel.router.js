import { createChannel,getChannelName,getChannelById } from "../Controller/Channel.Controller.js";
import { verify } from "jsonwebtoken";

function ChannelRouter(app) {
    app.post('/api/channel/create', verify, createChannel);
    app.get('/api/channel/name/:id', verify, getChannelName);
    app.get('/api/channel/:id', verify, getChannelById);
}

export default ChannelRouter;
