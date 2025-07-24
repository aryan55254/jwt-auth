const jwt = require("jsonwebtoken");
const User = require("../models/user.model");

const authenticateuser = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      res.status(401).json({ message: "not authorized , no token " });
      return;
    }
    const JWT_SECRET = process.env.JWT_SECRET;
    const decoded = jwt.verify(token, JWT_SECRET);
    const user = await User.findById(decoded.userid, "_id username email");
    if (!user) {
      res.status(401).json({ message: "not authorized , user not found" });
      return;
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("authentication error", error);
    res.status(500).json({ message: "server error during authentication" });
    return;
  }
};
module.exports = authenticateuser;
