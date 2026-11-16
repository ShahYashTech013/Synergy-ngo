const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });
const mongoose = require("mongoose");

const uri = process.env.LOCAL_MONGODB_URI || "mongodb://127.0.0.1:27017/synergy_ngo";
console.log("Testing connection to:", uri);

mongoose.connect(uri, {
  serverSelectionTimeoutMS: 5000,
  dbName: "synergy_ngo"
})
  .then(() => {
    console.log("SUCCESS: MongoDB connected successfully!");
    process.exit(0);
  })
  .catch((err) => {
    console.error("FAILURE: MongoDB connection error:", err.message);
    process.exit(1);
  });
