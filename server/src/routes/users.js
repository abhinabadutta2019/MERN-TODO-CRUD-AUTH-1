import express from "express";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { UserModel } from "../models/Users";

const router = express.Router();

//

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  res.json(user);
});
//

export { router as userRouter };
