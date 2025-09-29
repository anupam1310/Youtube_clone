import express from "express";
import mongoose from "mongoose";
const app = express();
const PORT = 4050;

app.listen(PORT, () => {
  // Server is running
  console.log(`Server is listening on port ${PORT}`);
});
app.use(express.json());

mongoose.connect('mongodb+srv://anupamkaushik3_db_user:OC3cHmokdFEDACcz@server.wvri3ec.mongodb.net/').
then(() => {
    console.log("Connected to Database");
})
.catch((err) => {
    console.log("Error connecting to Database", err);
});