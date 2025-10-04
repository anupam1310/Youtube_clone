import mongoose from "mongoose";
import { Schema } from "mongoose";

// Define the User schema
const userSchema = new Schema({
  fullname: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  avatar_url: { type: String },
  channelID: { type: String },
});
// Create and export the User model
const UserModel = mongoose.model("User", userSchema);

export default UserModel;
