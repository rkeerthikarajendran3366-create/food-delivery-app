const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    console.log("MongoDB URI starts with:", mongoURI?.substring(0, 20));

    await mongoose.connect(mongoURI);

    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error.message);
    process.exit(1);
  }
};

module.exports = connectDB;