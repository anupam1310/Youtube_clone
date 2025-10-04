import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the Channel schema
const channelSchema = new Schema({
  channelName: { type: String, required: true, unique: true },
  ownerId: { type: String, required: true },
  description: { type: String, required: true },
  channelBannerURL: { type: String, default: "" },
  subscribers: { type: Number, default: 0 },
  videos: [{ type: String }],
});

// Create and export the Channel model
const ChannelModel = mongoose.model("Channel", channelSchema);

export default ChannelModel;
