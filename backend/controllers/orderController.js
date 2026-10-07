const Order = require("../models/Order");

// =====================================================
// CREATE NEW ORDER
// =====================================================

const createOrder = async (req, res) => {
  try {
    const {
      customer,
      items,
      total,
      scheduledDate,
      scheduledTime,
      paymentStatus,
      paymentId,
      razorpayOrderId,
    } = req.body;

    const userId = req.user._id;
    const userEmail = req.user.email;

    if (
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

// =====================================================
// GET USER'S OWN ORDERS
// =====================================================

const getUserOrders = async (req, res) => {
  try {
    const requestedUserId = req.params.userId;
    const loggedInUserId = req.user._id.toString();

    if (
      req.user.role !== "admin" &&
      requestedUserId !== loggedInUserId
    ) {
      return res.status(403).json({
        success: false,
        message: "Access denied. You can only view your own orders.",
      });
    }

    const orders = await Order.find({
      userId: requestedUserId,
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

// =====================================================
// GET ALL ORDERS - ADMIN
// =====================================================

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

// =====================================================
// GET RESTAURANT OWNER ORDERS
// =====================================================

const getOwnerOrders = async (req, res) => {
  try {
    if (req.user.role !== "restaurantOwner") {
      return res.status(403).json({
        success: false,
        message: "Restaurant owner access required",
      });
    }

    if (!req.user.restaurantId) {
      return res.status(404).json({
        success: false,
        message: "No restaurant assigned to this owner",
      });
    }

    const ownerRestaurantId = String(req.user.restaurantId);

    const orders = await Order.find({
      "items.restaurantId": ownerRestaurantId,
    })
      .populate("userId", "name email phone")
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      orders,
      restaurantId: ownerRestaurantId,
      totalOrders: orders.length,
    });
  } catch (error) {
    console.error("Get Owner Orders Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch restaurant orders",
      error: error.message,
    });
  }
};

// =====================================================
// UPDATE ORDER STATUS
// ADMIN + RESTAURANT OWNER
// =====================================================

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

    const order = await Order.findById(id);

    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Order not found",
      });
    }

    // Owner can update ONLY their restaurant's orders
    if (req.user.role === "restaurantOwner") {
      if (!req.user.restaurantId) {
        return res.status(403).json({
          success: false,
          message: "No restaurant assigned",
        });
      }

      const ownerRestaurantId = String(req.user.restaurantId);

      const ownsOrder = order.items.some(
        (item) =>
          String(item.restaurantId) === ownerRestaurantId
      );

      if (!ownsOrder) {
        return res.status(403).json({
          success: false,
          message: "You can only manage your restaurant orders",
        });
      }
    }

    order.status = status;
    await order.save();

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

// =====================================================
// EXPORT CONTROLLERS
// =====================================================

module.exports = {
  createOrder,
  getUserOrders,
  getAllOrders,
  getOwnerOrders,
  updateOrderStatus,
};