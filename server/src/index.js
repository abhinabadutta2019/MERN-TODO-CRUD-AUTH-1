import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

// console.log("Hi");

const app = express();

app.use(express.json);
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 3009;
app.listen(PORT, () => console.log(`server is running on ${PORT}`));
