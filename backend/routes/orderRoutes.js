const express = require("express");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// CREATE ORDER — logged-in users
// =====================================================

router.post("/", authenticate, createOrder);

// =====================================================
// GET ALL ORDERS — admin only
// NOTE: must be defined BEFORE "/:userId",
// otherwise Express matches "admin" as a userId.
// =====================================================

router.get(
  "/admin",
  authenticate,
  authorize("admin"),
  getAllOrders
);

// =====================================================
// UPDATE ORDER STATUS — admin only
// =====================================================

router.put(
  "/:id/status",
  authenticate,
  authorize("admin"),
  updateOrderStatus
);

// =====================================================
// GET ORDERS FOR A SPECIFIC USER — logged-in users
// =====================================================

router.get("/:userId", authenticate, getUserOrders);

module.exports = router;