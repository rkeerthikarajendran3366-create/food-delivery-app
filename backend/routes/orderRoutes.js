const express = require("express");

const {
  registerUser,
  loginUser,
  getAllUsers,
} = require("../controllers/authController");

const router = express.Router();

// =====================================================
// REGISTER
// =====================================================

router.post(
  "/register",
  registerUser
);

// =====================================================
// LOGIN
// =====================================================

router.post(
  "/login",
  loginUser
);

// =====================================================
// GET ALL USERS
// =====================================================

router.get(
  "/users",
  getAllUsers
);

module.exports = router;