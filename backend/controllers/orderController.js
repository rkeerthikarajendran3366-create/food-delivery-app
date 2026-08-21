const Order = require("../models/Order");

// Create new order
const createOrder = async (req, res) => {
  try {
    const {
      userId,
      userEmail,
      customer,
      items,
      total,
      scheduledDate,
      scheduledTime,
      paymentStatus,
      paymentId,
      razorpayOrderId,
    } = req.body;

    // Basic validation
    if (
      !userId ||
      !userEmail ||
      !customer ||
      !items ||
      !items.length ||
      total === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Required order details are missing",
      });
    }

    // Create order
    const order = await Order.create({
      userId,
      userEmail,
      customer,
      items,
      total,
      scheduledDate: scheduledDate || "",
      scheduledTime: scheduledTime || "",
      paymentStatus:
        paymentStatus ||
        (customer.payment === "Cash on Delivery"
          ? "COD"
          : "Pending"),
      paymentId: paymentId || "",
      razorpayOrderId: razorpayOrderId || "",
      status: "Confirmed",
    });

    res.status(201).json({
      success: true,
      message: "Order created successfully",
      order,
    });
  } catch (error) {
    console.error("Create Order Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to create order",
      error: error.message,
    });
  }
};

// Get orders for a specific user
const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.params;

    const orders = await Order.find({
      userId,
    }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get User Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch user orders",
      error: error.message,
    });
  }
};

// Get all orders for admin
const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
    });
  } catch (error) {
    console.error("Get All Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch all orders",
      error: error.message,
    });
  }
};

// Update order status
const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    const allowedStatuses = [
      "Confirmed",
      "Preparing",
      "Out for Delivery",
      "Delivered",
      "Cancelled",
    ];

    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({
        success: false,
        message: "Invalid order status",
      });
    }

    const order = await Order.findByIdAndUpdate(
      id,
      { status },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Order status updated successfully",
      order,
    });
  } catch (error) {
    console.error("Update Order Status Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update order status",
      error: error.message,
    });
  }
};

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  updateOrderStatus,
};