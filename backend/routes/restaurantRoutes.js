console.log("✅ restaurantRoutes loaded");

const express = require("express");

const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  getOwnerRestaurant,
  updateOwnerRestaurant,
  getRestaurantStats,
} = require("../controllers/restaurantController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// Public
router.get("/", getRestaurants);

// Admin statistics
router.get(
  "/stats",
  authenticate,
  authorize("admin"),
  getRestaurantStats
);

// Restaurant Owner
router.get(
  "/owner/my-restaurant",
  authenticate,
  authorize("restaurantOwner"),
  getOwnerRestaurant
);

router.put(
  "/owner/my-restaurant",
  authenticate,
  authorize("restaurantOwner"),
  updateOwnerRestaurant
);

// Public single restaurant
router.get("/:id", getRestaurantById);

// Admin create restaurant
router.post(
  "/",
  authenticate,
  authorize("admin"),
  createRestaurant
);

module.exports = router;