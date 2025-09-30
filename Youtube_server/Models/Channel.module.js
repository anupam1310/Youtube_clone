/**{ channelId: "channel01", channelName: "Code with John", owner: "user01", description: 
"Coding tutorials and tech reviews by John Doe.", channelBanner:  
"https://example.com/banners/john_banner.png", subscribers: 5200, videos: ["video01", 
"video02"], }  */

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const channelSchema = new Schema({
    channelName: { type: String, required: true },
    ownerId: { type: String, required: true },
    description: { type: String },
    channelBanner: { type: String },
    subscribers: { type: Number, default: 0 },
    videos: [{ type: String }]
});

const ChannelModel = mongoose.model('Channel', channelSchema);

export default ChannelModel;
