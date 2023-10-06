const express = require("express");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/Users");

const router = express.Router();

//

router.post("/register", async (req, res) => {
  const { username, password } = req.body;

  const user = await UserModel.findOne({ username: username });

  res.json(user);
});
//

module.exports = router;
