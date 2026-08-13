const express = require("express");
const bcrypt = require("bcryptjs");

const {
  registerUser,
  loginUser,
} = require("../controllers/authController");

const User = require("../models/User");

const router = express.Router();


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);


// TEMPORARY ADMIN CREATION
router.post("/create-admin-temp", async (req, res) => {
  try {
    const adminEmail = "admin@foodexpress.com";
    const adminPassword = "Admin@123";

    const existingAdmin = await User.findOne({
      email: adminEmail,
    });

    if (existingAdmin) {
      return res.status(200).json({
        success: true,
        message: "Admin already exists",
        email: existingAdmin.email,
        role: existingAdmin.role,
      });
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

    res.status(201).json({
      success: true,
      message: "Admin created successfully",
      email: admin.email,
      role: admin.role,
    });

  } catch (error) {
    console.error("Admin creation error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
});


module.exports = router;