const express = require("express");

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// REGISTER
// Public
// =====================================================

router.post("/register", registerUser);

// =====================================================
// LOGIN
// Public
// =====================================================

router.post("/login", loginUser);

// =====================================================
// GET ALL USERS
// Admin Only
// =====================================================

router.get(
  "/users",
  authenticate,
  authorize("admin"),
  getAllUsers
);

module.exports = router;
