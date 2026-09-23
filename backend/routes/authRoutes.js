const express = require("express");

const {
  registerUser,
  loginUser,
  registerBusiness,
  getAllUsers,
  updateUserRole,
  updateProfile,
} = require("../controllers/authController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// --------------------------------------------------
// NORMAL USER REGISTER / LOGIN
// --------------------------------------------------

router.post(
  "/register",
  registerUser
);

router.post(
  "/login",
  loginUser
);

// --------------------------------------------------
// BUSINESS / RESTAURANT OWNER REGISTRATION
// --------------------------------------------------

router.post(
  "/register-business",
  authenticate,
  registerBusiness
);

// --------------------------------------------------
// USER PROFILE UPDATE
// --------------------------------------------------

router.put(
  "/profile",
  authenticate,
  updateProfile
);

// --------------------------------------------------
// ADMIN - GET ALL USERS
// --------------------------------------------------

router.get(
  "/users",
  authenticate,
  authorize("admin"),
  getAllUsers
);

// --------------------------------------------------
// ADMIN - UPDATE USER ROLE
// --------------------------------------------------

router.put(
  "/users/:userId/role",
  authenticate,
  authorize("admin"),
  updateUserRole
);

module.exports = router;