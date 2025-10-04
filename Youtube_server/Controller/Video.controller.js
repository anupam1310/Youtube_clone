import { Mongoose } from "mongoose";
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
    const { title, description, tags, videoId, channelId, uploaderId, thumbnailUrl } = req.body;
    console.log(req.body);
    try {
        const newVideo = new VideoModel({
            title: title,
            description: description,
            tags: tags,
            channelId: channelId,
            videoId: videoId,
            uploaderId: uploaderId,
            thumbnailUrl: thumbnailUrl
        });
        await newVideo.save();
        res.status(201).json(newVideo);
    } catch (error) {
        res.status(500).json({ message: "Error uploading video", error });
        console.log(error);
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

export async function addComment(req, res) {
    const videoId = req.params.id;
    const userId = req.userId;
    const { text } = req.body;
    // console.log("User ID:", userId);
    try {
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        // console.log("Adding comment to video:", videoId);
        const newComment = {
            commentId: video.comments.length + 1 + "", 
            userId:userId,
            text:text,
            timestamp: new Date()
        };
        // console.log("New Comment:", newComment);
        video.comments.push(newComment);
        await video.save();
        res.status(201).json(newComment);
    } catch (error) {
        res.status(500).json({ message: "Error adding comment", error });
    }
}
export async function deleteComment(req, res) {
    const videoId = req.params.id;
    const commentId = req.params.commentId;
    // console.log("Comment ID to delete:", commentId);

    try {
        // console.log("starting try block");
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        // console.log("Video found:", videoId);
        video.comments = video.comments.filter(c => c.commentId !== commentId);
        await video.save();
        res.status(200).json({ message: "Comment deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting comment", error });
    }
}

export async function editComment(req, res) {
    const videoId = req.params.id;
    const commentId = req.params.commentId;
    const { text } = req.body;

    try {
        console.log("starting try block");
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        console.log("Video found:", videoId);
        console.log("Comment ID to edit:", commentId);
        const comment = video.comments.find(c => c.commentId === commentId);
        console.log("Comment found:", comment);
        if (!comment) {
            return res.status(404).json({ message: "Comment not found" });
        }
        console.log("Comment found:", commentId);
        comment.text = text;
        await video.save();
        res.status(200).json({ message: "Comment edited successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error editing comment", error });
    }
}

export async function likeVideoById(req, res) {
    const videoId = req.params.id;
    try {
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        video.likes += 1;
        await video.save();
        res.status(200).json({ message: "Video liked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error liking video", error });
    }
}

export async function dislikeVideoById(req, res) {
    const videoId = req.params.id;
    try {
        const video = await VideoModel.findById(videoId);
        if (!video) {
            return res.status(404).json({ message: "Video not found" });
        }
        video.dislikes += 1;
        await video.save();
        res.status(200).json({ message: "Video disliked successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error disliking video", error });
    }
}
