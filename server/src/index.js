const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

//
const userRouter = require("./routes/users.js");
// console.log("Hi");

const app = express();

app.use(express.json);
app.use(cors());
dotenv.config();
//
app.use("/auth", userRouter);
//
///////mongoDB cloud//////////////////
let uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.te788iv.mongodb.net/MERN-todo-app?retryWrites=true&w=majority`;
//
mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
//////////////////////////////////////////////
/// this part just to check mongoDB connection////////////////////////////////
const db = mongoose.connection;

db.on("error", (error) => {
  console.error("MongoDB connection error:", error);
});

db.once("open", () => {
  console.log("Connected to MongoDB");
});
////////////////////////////

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
