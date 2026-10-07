const Restaurant = require("../models/Restaurant");

// =====================================================
// GET ALL RESTAURANTS
// Public
// =====================================================

const getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find()
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      restaurants,
    });
  } catch (error) {
    console.error("Get Restaurants Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurants",
      error: error.message,
    });
  }
};

// =====================================================
// GET ONE RESTAURANT
// Public
// =====================================================

const getRestaurantById = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(
      req.params.id
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Get Restaurant Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant",
      error: error.message,
    });
  }
};

// =====================================================
// CREATE RESTAURANT
// ADMIN ONLY
// =====================================================

const createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create({
      ...req.body,
      ownerId: req.body.ownerId || null,
    });

    res.status(201).json({
      success: true,
      message: "Restaurant created successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Create Restaurant Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create restaurant",
      error: error.message,
    });
  }
};

// =====================================================
// GET OWNER RESTAURANT
// OWNER ONLY
// =====================================================

const getOwnerRestaurant = async (req, res) => {
  try {
    if (!req.user.restaurantId) {
      return res.status(404).json({
        success: false,
        message: "No restaurant assigned",
      });
    }

    const restaurant = await Restaurant.findById(
      req.user.restaurantId
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Restaurant not found",
      });
    }

    res.status(200).json({
      success: true,
      restaurant,
    });
  } catch (error) {
    console.error("Get Owner Restaurant Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch owner restaurant",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE OWNER RESTAURANT
// OWNER ONLY
// =====================================================

const updateOwnerRestaurant = async (req, res) => {
  try {
    if (!req.user.restaurantId) {
      return res.status(404).json({
        success: false,
        message: "No restaurant assigned",
      });
    }

    const allowedFields = [
      "name",
      "cuisine",
      "image",
      "rating",
      "deliveryTime",
      "description",
      "location",
      "costForTwo",
      "menu",
    ];

    const updateData = {};

    allowedFields.forEach((field) => {
      if (req.body[field] !== undefined) {
        updateData[field] = req.body[field];
      }
    });

    // ---------------------------------------------
    // Clean menu items (name + price must be valid)
    // Old dish id is kept, so cart does not break
    // ---------------------------------------------
    if (updateData.menu !== undefined) {
      if (!Array.isArray(updateData.menu)) {
        return res.status(400).json({
          success: false,
          message: "Menu must be a list of dishes",
        });
      }

      updateData.menu = updateData.menu
        .filter(
          (item) =>
            item &&
            String(item.name || "").trim() !== "" &&
            Number(item.price) > 0
        )
        .map((item) => ({
          ...(item.id ? { id: String(item.id) } : {}),
          name: String(item.name).trim(),
          price: Number(item.price),
          image: String(item.image || "").trim(),
        }));
    }

    const restaurant = await Restaurant.findOneAndUpdate(
      {
        _id: req.user.restaurantId,
        ownerId: req.user._id,
      },
      updateData,
      {
        new: true,
        runValidators: true,
      }
    );

    if (!restaurant) {
      return res.status(404).json({
        success: false,
        message: "Your restaurant was not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Restaurant details updated successfully",
      restaurant,
    });
  } catch (error) {
    console.error("Update Owner Restaurant Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update restaurant",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN RESTAURANT COUNT
// =====================================================

const getRestaurantStats = async (req, res) => {
  try {
    const totalRestaurants =
      await Restaurant.countDocuments();

    const ownerRestaurants =
      await Restaurant.countDocuments({
        ownerId: { $ne: null },
      });

    res.status(200).json({
      success: true,
      totalRestaurants,
      ownerRestaurants,
    });
  } catch (error) {
    console.error("Restaurant Stats Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant statistics",
    });
  }
};

module.exports = {
  getRestaurants,
  getRestaurantById,
  createRestaurant,
  getOwnerRestaurant,
  updateOwnerRestaurant,
  getRestaurantStats,
};