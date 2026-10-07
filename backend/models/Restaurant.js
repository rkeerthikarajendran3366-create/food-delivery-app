const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      default: () =>
        `${Date.now()}-${Math.random()
          .toString(36)
          .slice(2, 8)}`,
    },

    name: {
      type: String,
      required: true,
      trim: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    image: {
      type: String,
      default: "",
    },
  },
  { _id: false }
);

const restaurantSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    cuisine: {
      type: String,
      required: true,
    },

    image: {
      type: String,
      required: true,
    },

    rating: {
      type: Number,
      default: 4.5,
    },

    deliveryTime: {
      type: String,
      required: true,
    },

    description: {
      type: String,
      default: "",
    },

    // ================= NEW (optional) =================

    location: {
      type: String,
      default: "",
    },

    costForTwo: {
      type: String,
      default: "",
    },

    // ==================================================

    ownerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      default: null,
    },

    menu: {
      type: [menuItemSchema],
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model(
  "Restaurant",
  restaurantSchema
);