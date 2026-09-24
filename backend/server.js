const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

console.log("✅ Loading restaurant routes...");
const restaurantRoutes = require("./routes/restaurantRoutes");
console.log("✅ Restaurant routes loaded successfully");

const paymentRoutes = require("./routes/paymentRoutes");
const orderRoutes = require("./routes/orderRoutes");
const businessApplicationRoutes = require("./routes/businessApplicationRoutes");

const app = express();

// =====================================================
// CONNECT TO MONGODB
// =====================================================

connectDB();

// =====================================================
// MIDDLEWARE
// =====================================================

app.use(cors());
app.use(express.json());

// =====================================================
// TEST ROUTE
// =====================================================

app.get("/", (req, res) => {
  res.send("🍔 Food Delivery Backend is Running");
});

// =====================================================
// API TEST ROUTE
// =====================================================

app.get("/api/test", (req, res) => {
  res.json({
    message: "API Working",
  });
});

// =====================================================
// API ROUTES
// =====================================================

// Authentication
app.use("/api/auth", authRoutes);

// Restaurants
app.use("/api/restaurants", restaurantRoutes);

// Payments
app.use("/api/payment", paymentRoutes);

// Orders
app.use("/api/orders", orderRoutes);

// Business / Restaurant Owner Applications
app.use(
  "/api/business-applications",
  businessApplicationRoutes
);

// =====================================================
// SERVER PORT
// =====================================================

const PORT = process.env.PORT || 5000;

// =====================================================
// START SERVER
// =====================================================

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});