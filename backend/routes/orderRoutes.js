const express = require("express");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOwnerOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// CREATE NEW ORDER
// =====================================================

router.post(
  "/",
  authenticate,
  createOrder
);

// =====================================================
// GET ALL ORDERS - ADMIN
// IMPORTANT: /admin BEFORE /:userId
// =====================================================

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  getAllOrders
);

// =====================================================
// GET RESTAURANT OWNER ORDERS
// =====================================================

router.get(
  "/owner",
  authenticate,
  authorize("restaurantOwner"),
  getOwnerOrders
);

// =====================================================
// UPDATE ORDER STATUS
// ADMIN + RESTAURANT OWNER
// =====================================================

router.put(
  "/:id/status",
  authenticate,
  authorize("admin", "restaurantOwner"),
  updateOrderStatus
);

// =====================================================
// GET USER'S OWN ORDERS
// =====================================================

router.get(
  "/:userId",
  authenticate,
  getUserOrders
);

// =====================================================
// EXPORT ROUTER
// =====================================================

module.exports = router;