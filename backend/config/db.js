const mongoose = require("mongoose");

module.exports = async function connectDB() {
  const uri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/synergy_ngo";
  const fallbackUri = process.env.LOCAL_MONGODB_URI || "mongodb://127.0.0.1:27017/synergy_ngo";

  try {
    await mongoose.connect(uri, {
      dbName: "synergy_ngo",
      serverSelectionTimeoutMS: 4000,
    });
    console.log("MongoDB connected successfully");
  } catch (primaryError) {
    if (uri !== fallbackUri) {
      console.warn(`Primary MongoDB connection failed (${primaryError.message}). Falling back to local MongoDB...`);
      await mongoose.connect(fallbackUri, {
        dbName: "synergy_ngo",
        serverSelectionTimeoutMS: 4000,
      });
      console.log("MongoDB connected to local instance");
    } else {
      throw primaryError;
    }
  }
};
