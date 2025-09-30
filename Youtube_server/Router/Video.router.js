import { getAllVideos,getRandomVideos,getVideoById } from "../Controller/Video.controller";
function VideoRouter(app) {

    app.get('/api/video/:id', getVideoById);
    app.get('/api/videos', getAllVideos);
    app.get('/api/video/random', getRandomVideos);
    
};

export default VideoRouter;
