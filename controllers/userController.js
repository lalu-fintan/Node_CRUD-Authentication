const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const register = asyncHandler(async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }

  const userAvilable = await userModel.findOne({ email });
  if (userAvilable) {
    res.status(400);
    throw new Error("user Already  registed");
  }
  const hashPassword = await bcrypt.hash(password, 10);

  const user = await userModel.create({
    username,
    email,
    password: hashPassword,
  });
  console.log(`user created ${user}`);
  if (user) {
    res.status(200).json({ _id: user.id, email: user.email });
  } else {
    res.status(400);
    throw new Error("user data is inValid");
  }
});
const current = asyncHandler(async (req, res) => {
  res.json(req.user);
});

//@current user info is private
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    res.status(400);
    throw new Error("all fields are required");
  }
  const user = await userModel.findOne({ email });
  if (user && (await bcrypt.compare(password, user.password))) {
    const accessToken = jwt.sign(
      {
        user: {
          username: user.username,
          email: user.email,
          id: user.id,
        },
      },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: "1h" }
    );
    res.status(200).json({ accessToken });
  } else {
    res.status(401);
    throw new Error("email or password is not valid");
  }
});

module.exports = { register, login, current };
