//{ userId: "user01", username: "JohnDoe", email: "john@example.com", password: 
//"hashedPassword123", avatar: "https://example.com/avatar/johndoe.png", channels: 
//["channel01"], }  

import mongoose from 'mongoose';
import { Schema } from 'mongoose';

const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: { type: String },
    channels: [String],
});
const UserModel = mongoose.model('User', userSchema);

export default UserModel;
