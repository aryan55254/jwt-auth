const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectdb = require("./db/conectdb");

const app = express();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

connectdb();

app.listen(PORT, () => {
  console.log("Server Is Running");
});
