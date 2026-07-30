console.log("✅ restaurantRoutes loaded");

const express = require("express");

const {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
} = require("../controllers/restaurantController");

const router = express.Router();

// Get all restaurants
router.get("/", getRestaurants);

// Get restaurant by ID
router.get("/:id", getRestaurantById);

// Create restaurant
router.post("/", createRestaurant);

module.exports = router;