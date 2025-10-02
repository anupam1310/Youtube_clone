import ChannelModel from "../Models/Channel.modle.js";
import UserModel from "../Models/User.model.js";

export async function getChannelName(req, res) {
    const { id } = req.params;
    try {
        const channel = await ChannelModel.findById(id);
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }
        res.status(200).json({ name: channel.name });
    } catch (error) {
        res.status(500).json({ message: "Error fetching channel name", error });
    }
}

export async function getChannelById(req, res) {
    const { id } = req.params;
    try {
        const channel = await ChannelModel.findById(id);
        if (!channel) {
            return res.status(404).json({ message: "Channel not found" });
        }
        res.status(200).json(channel);
    } catch (error) {
        res.status(500).json({ message: "Error fetching channel", error });
    }
}
export async function createChannel(req, res) {
    const { channelName, description, channelBannerURL } = req.body;
    const ownerId = req.userId;
    try {
        const newChannel = new ChannelModel({ channelName: channelName, description: description, ownerId: ownerId, channelBannerURL: channelBannerURL });
        await newChannel.save();
        // Update UserModel to link the channel
        const document = await UserModel.findByIdAndUpdate(ownerId, { channelID: newChannel._id });
        console.log(document);
        res.status(201).json({ message: "Channel created successfully", channel: newChannel });
    } catch (error) {
        res.status(500).json({ message: "Error creating channel", error });
    }
}

export async function getChannelByUserId(req, res) {
    const { id } = req.params;
    try {
        const channels = await ChannelModel.find({ ownerId: id });
        res.status(200).json(channels);
    } catch (error) {
        res.status(500).json({ message: "Error fetching channels", error });
    }
}