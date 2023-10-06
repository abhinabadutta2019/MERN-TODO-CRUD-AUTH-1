import express from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { User } from "../models/Users.js";

const router = express.Router();

//

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username: username });

    res.json(user);
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
//

export { router as userRouter };
