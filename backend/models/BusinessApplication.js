const mongoose = require("mongoose");

const businessApplicationSchema = new mongoose.Schema(
  {
    // User who submitted the business application
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Business information
    businessName: {
      type: String,
      required: true,
      trim: true,
    },

    ownerName: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    phone: {
      type: String,
      required: true,
      trim: true,
    },

    // Restaurant information
    restaurantName: {
      type: String,
      required: true,
      trim: true,
    },

    cuisine: {
      type: String,
      required: true,
      trim: true,
    },

    address: {
      type: String,
      required: true,
      trim: true,
    },

    city: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      default: "",
      trim: true,
    },

    openingTime: {
      type: String,
      default: "",
    },

    closingTime: {
      type: String,
      default: "",
    },

    // Admin approval status
    status: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },

    // Optional admin information
    rejectionReason: {
      type: String,
      default: "",
    },

    reviewedAt: {
      type: Date,
      default: null,
    },
  },
  {
    timestamps: true,
  }
);

module.exports =
  mongoose.model(
    "BusinessApplication",
    businessApplicationSchema
  );