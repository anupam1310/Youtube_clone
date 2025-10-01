import express from "express";
import mongoose from "mongoose";
import UserRouter from "./Router/User.router.js";
import VideoRouter from "./Router/Video.router.js";
import ChannelRouter from "./Router/Channel.router.js";
import cors from "cors";



const app = express();


// Middleware
app.use(cors());
app.use(express.json());


const PORT = 4050;

app.listen(PORT, () => {
  // Server is running
  console.log(`Server is listening on port ${PORT}`);
});

mongoose.connect('mongodb+srv://anupamkaushik3_db_user:OC3cHmokdFEDACcz@server.wvri3ec.mongodb.net/').
then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.log("Error connecting to Database", err);
});

UserRouter(app);
VideoRouter(app);
ChannelRouter(app);