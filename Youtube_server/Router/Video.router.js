import { getAllVideos,getRandomVideos,getVideoById, getVideosByChannelId,uploadVideo,deleteVideo , addComment, editComment, deleteComment, likeVideoById, dislikeVideoById} from "../Controller/Video.controller.js";
import { verifyToken } from "../Middleware/verify.js";
function VideoRouter(app) {
    console.log("Setting up video routes");
    app.get('/api/video/:id', getVideoById);
    app.get('/api/videos', getAllVideos);
    app.get('/api/video/channel/:id', verifyToken, getVideosByChannelId);
    app.post('/api/upload/video', verifyToken, uploadVideo);
    app.delete('/api/video/:id', verifyToken, deleteVideo);
    app.post('/api/video/:id/like', verifyToken, likeVideoById);
    app.post('/api/video/:id/dislike', verifyToken, dislikeVideoById);
    app.post('/api/video/:id/comment', verifyToken, addComment);
    app.delete('/api/video/:id/comment/:commentId', verifyToken, deleteComment);
    app.put('/api/video/:id/comment/:commentId', verifyToken, editComment);
}

export default VideoRouter;
