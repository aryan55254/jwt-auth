const router = require("express").Router();
const user = require("../models/user.model");
const bcrypt = require("bcryptjs");
const { generatejwt, clearjwt } = require("../utils/jwt");
//register
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      res.status(400).json({ message: "missing credentials" });
      return;
    }
    const existingemail = await user.findOne({ email });
    if (existingemail) {
      res.status(400).json({ message: "email already exists " });
      return;
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    const newuser = new user({
      username,
      email,
      password: hashedpassword,
    });
    await newuser.save();
    res.status(201).json({ mesage: "user created succsfully" });
  } catch (error) {
    console.log("server error : ", error);
    res.status(500).json({ message: "internal server error : ", error });
  }
});
//login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({ message: "missing credentials" });
      return;
    }
    const doesemailexists = await user.findOne({ email });
    if (!doesemailexists) {
      res.status(400).json({ message: "this email is not registered" });
      return;
    }
    const ismatch = await bcrypt.compare(password, doesemailexists.password);
    if (!ismatch) {
      res.status(400).json({ message: "incorrect password" });
      return;
    }
    generatejwt(res, doesemailexists._id);
    res.status(200).json({ message: "login succesful" });
  } catch (err) {
    console.log("internal server error : ", err);
    res.status(500).json({ message: "internam server error ", err });
  }
});
//logout
router.post("/logout", async (req, res) => {
  try {
    clearjwt(res);
    res.status(200).json({ mesage: "logout successful" });
  } catch (error) {
    console.log("internal server error : ", error);
    res.status(500).json({ message: "internal server error ", error });
  }
});
module.exports = router;
