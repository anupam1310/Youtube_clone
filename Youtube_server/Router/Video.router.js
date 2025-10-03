import { getAllVideos,getRandomVideos,getVideoById, getVideosByChannelId,uploadVideo,deleteVideo } from "../Controller/Video.controller.js";
import { verifyToken } from "../Middleware/verify.js";
function VideoRouter(app) {
    console.log("Setting up video routes");
    app.get('/api/video/:id', getVideoById);
    app.get('/api/videos', getAllVideos);
    app.get('/api/video/random', getRandomVideos);
    app.get('/api/video/channel/:id', verifyToken, getVideosByChannelId);
    app.post('/api/upload/video', verifyToken, uploadVideo);
    app.delete('/api/video/:id', verifyToken, deleteVideo);
}

export default VideoRouter;
