console.log("✅ restaurantRoutes loaded");

const express = require("express");

const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
} = require("../controllers/restaurantController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// GET ALL RESTAURANTS
// Public
// =====================================================

router.get("/", getRestaurants);

// =====================================================
// GET RESTAURANT BY ID
// Public
// User + Admin can view details
// =====================================================

router.get("/:id", getRestaurantById);

// =====================================================
// CREATE RESTAURANT
// Admin Only
// =====================================================

router.post(
  "/",
  authenticate,
  authorize("admin"),
  createRestaurant
);

module.exports = router;