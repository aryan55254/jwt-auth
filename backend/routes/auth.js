const router = require("express").Router();
const user = require("../models/user.model");

//register
router.post("/register", (req, res) => {
  const newuser = new user({
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
  });
  newuser
    .save()
    .then(() => res.status(200).json("note added"))
    .catch((err) => res.status(400).json("error: ", err));
});

module.exports = router;
