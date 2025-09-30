import { createChannel,getChannelName,getChannelById } from "../Controller/Channel.Controller.js";

function ChannelRouter(app) {
    app.post('/api/channel/create', createChannel);
    app.get('/api/channel/name/:id', getChannelName);
    app.get('/api/channel/:id', getChannelById);
}

export default ChannelRouter;
