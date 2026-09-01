const express = require("express");

const {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
} = require("../controllers/orderController");

const router = express.Router();

// =====================================================
// CREATE ORDER
// =====================================================

router.post("/", createOrder);

// =====================================================
// GET ALL ORDERS (ADMIN)
// NOTE: this must be defined BEFORE "/:userId",
// otherwise Express matches "admin" as a userId.
// =====================================================

router.get("/admin", getAllOrders);

// =====================================================
// UPDATE ORDER STATUS (ADMIN)
// =====================================================

router.put("/:id/status", updateOrderStatus);

// =====================================================
// GET ORDERS FOR A SPECIFIC USER
// =====================================================

router.get("/:userId", getUserOrders);

module.exports = router;