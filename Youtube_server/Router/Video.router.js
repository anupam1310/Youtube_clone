
function VideoRouter(app) {

    app.get('/api/video/:id', (req, res) => {});
    app.get('/api/videos', (req, res) => {});
    app.get('/api/video/random', (req, res) => {});
    
};

export default VideoRouter;
