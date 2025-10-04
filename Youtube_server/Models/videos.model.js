import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the Video schema
const videoSchema = new Schema({
  title: { type: String, required: true },
  thumbnailUrl: { type: String, required: true },
  videoId: { type: String, required: true },
  description: { type: String },
  tags: { type: [String] },
  channelId: { type: String, required: true },
  uploaderId: { type: String, required: true },
  views: { type: Number, default: 0 },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  uploadDate: { type: Date, default: Date.now },
  comments: [
    {
      commentId: { type: String, required: true },
      userId: { type: String, required: true },
      text: { type: String, required: true },
      timestamp: { type: Date, default: Date.now },
    },
  ],
});

// Create and export the Video model
const VideoModel = mongoose.model("Video", videoSchema);

export default VideoModel;
