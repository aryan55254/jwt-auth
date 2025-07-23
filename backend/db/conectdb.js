const mongoose = require("mongoose");
require("dotenv").config();

const connectDB = async () => {
  try {
    const uri = process.env.MONGO_URI;
    await mongoose.connect(uri);
    console.log("MONGO CONNECTION ESTABLISHED");
  } catch (error) {
    console.error("mongo connection failed", error.message);
    process.exit(1);
  }
};
module.exports = connectDB;