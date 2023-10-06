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

    if (user) {
      return res.json({ messsage: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ username: username, password: hashedPassword });

    const savedUser = await newUser.save();

    res.json({ messsage: "user regestered", user: savedUser });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});
//
router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username: username });
    if (!user) {
      return res.json({ messsage: "User doesn't exists" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.json({ messsage: "wrong password" });
    }

    console.log(isPasswordValid, "isPasswordValid");
    res.json({ messsage: "user loggedin", user: user });
  } catch (err) {
    console.log(err);
    res.json(err);
  }
});

//

export { router as userRouter };
