const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");

const validation = asyncHandler(async (req, res, next) => {
  let token;
  let authHeader = (await req.header.Authorization) || req.header.authorization;
  if (authHeader && authHeader.startsWith("Bearer")) {
    token = authHeader.split(" ")[1];
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
      if (err) {
        res.status(400);
        throw new Error("User is not Authorized");
      }
      req.user = decoded.user;
      next();
    });
    if (!token) {
      res.status(401);
      throw new Error("user is not Autherized  or token is missing");
    }
  }
});

module.exports = validation;
