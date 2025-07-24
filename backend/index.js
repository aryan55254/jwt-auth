const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./db/conectdb");
const authroutes = require("./routes/auth.route");
const userroutes = require("./routes/user.route");
const cookieparser = require("cookie-parser");
const app = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(cookieparser());

const PORT = process.env.PORT || 4000;

connectdb();

app.use("/api/auth", authroutes);
app.use("/api/user", userroutes);

app.listen(PORT, () => {
  console.log("Server Is Running");
});
