import VideoModel from "../Models/videos.model.js";

export async function getRandomVideos(req, res) {
    try {
        const videos = await VideoModel.aggregate([{ $sample: { size: 10 } }]);
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching random videos", error });
    }};

export async function getVideoById(req, res) {
    const videoId = req.params.id;
    try {
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        res.status(200).json(video);
    } catch (error) {
        res.status(500).json({ message: "Error fetching video", error });
    }
};
export async function getAllVideos(req, res) {
    try {
        const videos = await VideoModel.find();
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error });
        }
};
