const express = require("express");

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

const router = express.Router();

// Register
router.post(
  "/register",
  registerUser
);

// Login
router.post(
  "/login",
  loginUser
);

// Get all users - Admin
router.get(
  "/users",
  getAllUsers
);

module.exports = router;