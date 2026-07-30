const Restaurant = require("../models/Restaurant");

// Get all restaurants
const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.status(200).json(restaurants);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

// Get restaurant by ID
const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);

    if (!restaurant) {
      return res.status(404).json({
        message: "Restaurant not found",
      });
    }

    res.status(200).json(restaurant);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch restaurant",
      error: error.message,
    });
  }
};

// Create restaurant
const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);

    res.status(201).json({
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
};