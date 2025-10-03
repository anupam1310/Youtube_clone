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


export async function getVideosByChannelId(req, res) {
    const channelId = req.params.id;
    try {
        const videos = await VideoModel.find({ channelId: channelId });
        res.status(200).json(videos);
    } catch (error) {
        res.status(500).json({ message: "Error fetching videos", error });
    }
}

export async function uploadVideo(req, res) {
    const { title, description, tags, channelId, videoId } = req.body;
    const uploaderId = req.userId;

    try {
        const newVideo = new VideoModel({
            title: title,
            description: description,
            tags: tags,
            channelId: channelId,
            videoId: videoId,
            uploaderId: uploaderId
        });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: "Error uploading video", error });
    }
}

export async function deleteVideo(req, res) {
    const videoId = req.params.id;
    const userId = req.userId; 
    try {
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        if (video.uploaderId !== userId) {
            return res.status(403).json({ message: "You are not authorized to delete this video" });
        }
        await VideoModel.findByIdAndDelete(videoId);
        res.status(200).json({ message: "Video deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting video", error });
    }
}