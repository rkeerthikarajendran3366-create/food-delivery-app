const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const dotenv = require("dotenv");

const User = require("./models/User");

dotenv.config();

const createAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("✅ MongoDB Connected");

    const adminEmail = "admin@foodexpress.com";
    const adminPassword = "Admin@123";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      console.log("⚠️ Admin account already exists");
      console.log("Email:", existingAdmin.email);
      console.log("Role:", existingAdmin.role);

      await mongoose.connection.close();
      process.exit(0);
    }

    const hashedPassword = await bcrypt.hash(
      adminPassword,
      10
    );

    const admin = await User.create({
      name: "FoodExpress Admin",
      email: adminEmail,
      password: hashedPassword,
      phone: "",
      address: "",
      role: "admin",
    });

    console.log("✅ Admin account created successfully");
    console.log("Email:", admin.email);
    console.log("Role:", admin.role);

    await mongoose.connection.close();

    process.exit(0);

  } catch (error) {
    console.error(
      "❌ Admin creation failed:",
      error.message
    );

    process.exit(1);
  }
};

createAdmin();