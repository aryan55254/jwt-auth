const jwt = require("jsonwebtoken");

const jwt_secret = process.env.JWT_SECRET;

const generatejwt = (res, userid) => {
  const token = jwt.sign({ userid }, jwt_secret, { expiresIn: "1h" });

  res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge: 3600000,
    path: "/",
  });
};
const clearjwt = (res) => {
  res.cookie("jwt", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    expires: new Date(0),
    path: "/",
  });
};
module.exports = { generatejwt, clearjwt };
