import express from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
//mention .js --or error happen when export
import { User } from "../models/Users.js";

const router = express.Router();

//

router.post("/register", async (req, res) => {
  try {
    const { username, password } = req.body;

    console.log(username, "username");
    console.log(password, "password");

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
      // return res.json({ messsage: "User doesn't exists" });
      return res.status(401).json({ message: "User doesn't exist" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      // return res.json({ messsage: "wrong password" });
      return res.status(401).json({ message: "Wrong password" });
    }

    console.log(isPasswordValid, "isPasswordValid");
    //
    //getting payload
    const payload = { _id: user._id.toString() };

    // console.log(process.env.JWT_SECRET);
    //
    const token = jwt.sign({ payload: payload }, process.env.JWT_SECRET);
    //
    console.log(token, "token");
    //
    return res.status(201).json({
      message: "Successful login",
      token: "your_jwt_token_here",
      userID: user._id,
    });
  } catch (err) {
    console.log(err);
    // res.json(err);
    res.status(500).json({ message: "Internal server error" });
  }
});
//
//middleware
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err) => {
      if (err) {
        return res.sendStatus(403);
        //error so teken not okay
      }
      next();
    });
  } else {
    res.sendStatus(401);
    //user is not verified
  }
};

//

export { router as userRouter, verifyToken };
