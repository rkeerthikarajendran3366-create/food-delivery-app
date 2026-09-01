const express = require("express");

const {
  createOrder,
  verifyPayment,
} = require("../controllers/paymentController");

const {
  authenticate,
} = require("../middleware/authMiddleware");

const router = express.Router();

// =====================================================
// CREATE RAZORPAY ORDER
// Logged-in users only
// =====================================================

router.post(
  "/create-order",
  authenticate,
  createOrder
);

// =====================================================
// VERIFY RAZORPAY PAYMENT
// Logged-in users only
// =====================================================

router.post(
  "/verify-payment",
  authenticate,
  verifyPayment
);

module.exports = router;
