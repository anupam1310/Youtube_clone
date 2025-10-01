import ChannelModel from "../Models/Channel.modle.js";

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
    const { channelName, description} = req.body;
    const ownerId = req.user._id;
    try {
        const newChannel = new ChannelModel({ channelName: channelName, description: description, ownerId: ownerId });
        await newChannel.save();
        res.status(201).json({ message: "Channel created successfully", channel: newChannel });
    } catch (error) {
        res.status(500).json({ message: "Error creating channel", error });
    }
}