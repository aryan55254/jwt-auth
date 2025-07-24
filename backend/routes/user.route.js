const User = require("../models/user.model");
const userrouter = require("express").Router();
const authmiddleware = require("../middleware/auth.middleware");
userrouter.get("/getuser", authmiddleware, async (req, res) => {
  try {
    const userID = req.user?._id;
    const user = await User.findById(userID, "_id username email");
    if (!user) {
      res.status(404).json({ message: "user not found" });
      return;
    }
    res.status(200).json(user);
  } catch (error) {
    console.log("server error :", error);
    res.status(500).json({ message: "internal server error", error });
  }
});

module.exports = userrouter;
