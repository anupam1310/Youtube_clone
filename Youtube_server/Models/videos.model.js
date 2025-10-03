/**
 * [ { "videoId": "video01", "title": "Learn React in 30 Minutes", "thumbnailUrl":  
"https://example.com/thumbnails/react30min.png", "description": "A quick tutorial to get started 
with React.", "channelId": "channel01", "uploader": "user01", "views": 15200, "likes": 1023, 
"dislikes": 45, "uploadDate": "2024-09-20", "comments": [ { "commentId": "comment01", "userId": 
"user02", "text": "Great video! Very helpful.", "timestamp": "2024-09-21T08:30:00Z" } ] }] 

*/
import mongoose from 'mongoose';
import { Schema } from 'mongoose';
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
    comments: [{
        commentId: { type: String, required: true },
        userId: { type: String, required: true },
        text: { type: String, required: true },
        timestamp: { type: Date, default: Date.now }
    }]
});

const VideoModel = mongoose.model('Video', videoSchema);

export default VideoModel;