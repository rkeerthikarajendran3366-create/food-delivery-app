require("dns").setServers(["8.8.8.8", "1.1.1.1"]);
require("dotenv").config();
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Restaurant = require("./models/Restaurant");

(async () => {
  await connectDB();
  const all = await Restaurant.find({ name: "Sri Lakshmi Kitchen" }).sort({ createdAt: 1 });
  const extra = all.slice(1).map((r) => r._id);
  const result = await Restaurant.deleteMany({ _id: { $in: extra } });
  console.log("Total:", all.length, "Deleted:", result.deletedCount);
  await mongoose.disconnect();
  process.exit();
})();