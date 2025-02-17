const mongoose = require("mongoose");

async function connectMongoDb() {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/users-creating");
    console.log("MongoDB connected successfully");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

module.exports = {
  connectMongoDb,
};
