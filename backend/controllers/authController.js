const User = require("../models/User");
const Restaurant = require("../models/Restaurant");
const BusinessApplication = require("../models/BusinessApplication");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// =====================================================
// REGISTER NORMAL USER
// =====================================================
const registerUser = async (req, res) => {
  try {
    const { name, email, password, phone, address } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      phone,
      address,
      role: "user",
      restaurantId: null,
    });

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(201).json({
      success: true,
      message: "User registered successfully",
      user: userResponse,
    });
  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// LOGIN USER
// =====================================================
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d",
      }
    );

    const userResponse = user.toObject();
    delete userResponse.password;

    res.status(200).json({
      success: true,
      message: "Login successful",
      token,
      user: userResponse,
    });
  } catch (error) {
    console.error("Login Error:", error);

    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// =====================================================
// REGISTER BUSINESS
// Logged-in USER submits business application
// =====================================================
const registerBusiness = async (req, res) => {
  try {
    const {
      businessName,
      ownerName,
      email,
      phone,
      restaurantName,
      cuisine,
      address,
      city,
      description,
      openingTime,
      closingTime,
    } = req.body;

    // ---------------------------------------------
    // Basic validation
    // ---------------------------------------------
    if (
      !businessName ||
      !ownerName ||
      !email ||
      !phone ||
      !restaurantName ||
      !cuisine ||
      !address ||
      !city
    ) {
      return res.status(400).json({
        success: false,
        message: "Please fill all required business details.",
      });
    }

    // ---------------------------------------------
    // Only normal users can submit a new application
    // ---------------------------------------------
    if (req.user.role !== "user") {
      return res.status(403).json({
        success: false,
        message:
          "Only normal users can submit a business registration.",
      });
    }

    // ---------------------------------------------
    // Check whether this user already has
    // a pending application
    // ---------------------------------------------
    const existingPendingApplication =
      await BusinessApplication.findOne({
        userId: req.user._id,
        status: "pending",
      });

    if (existingPendingApplication) {
      return res.status(400).json({
        success: false,
        message:
          "You already have a pending business registration application.",
      });
    }

    // ---------------------------------------------
    // Check email
    // ---------------------------------------------
    const normalizedEmail = email.trim().toLowerCase();

    // ---------------------------------------------
    // Create business application
    // ---------------------------------------------
    const application = await BusinessApplication.create({
      userId: req.user._id,

      businessName: businessName.trim(),
      ownerName: ownerName.trim(),
      email: normalizedEmail,
      phone: phone.trim(),

      restaurantName: restaurantName.trim(),
      cuisine: cuisine.trim(),

      address: address.trim(),
      city: city.trim(),

      description: description?.trim() || "",

      openingTime: openingTime || "",
      closingTime: closingTime || "",

      status: "pending",
    });

    res.status(201).json({
      success: true,
      message:
        "Business registration submitted successfully. Your application is pending admin approval.",
      application: {
        id: application._id,
        status: application.status,
        restaurantName: application.restaurantName,
        businessName: application.businessName,
      },
    });
  } catch (error) {
    console.error("Business Registration Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to submit business registration.",
      error: error.message,
    });
  }
};

// =====================================================
// GET ALL USERS - ADMIN ONLY
// =====================================================
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .populate("restaurantId", "name cuisine image");

    res.status(200).json({
      success: true,
      users,
    });
  } catch (error) {
    console.error("Get All Users Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch users",
      error: error.message,
    });
  }
};

// =====================================================
// ASSIGN / REMOVE RESTAURANT OWNER ROLE - ADMIN ONLY
// =====================================================
const updateUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role, restaurantId } = req.body;

    if (!["user", "restaurantOwner"].includes(role)) {
      return res.status(400).json({
        success: false,
        message:
          "Only User or Restaurant Owner role can be assigned.",
      });
    }

    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (user.role === "admin") {
      return res.status(403).json({
        success: false,
        message:
          "Admin role cannot be changed from this screen.",
      });
    }

    // ---------------------------------------------
    // Assign Restaurant Owner
    // ---------------------------------------------
    if (role === "restaurantOwner") {
      if (!restaurantId) {
        return res.status(400).json({
          success: false,
          message:
            "Restaurant is required for Restaurant Owner role.",
        });
      }

      const restaurant = await Restaurant.findById(restaurantId);

      if (!restaurant) {
        return res.status(404).json({
          success: false,
          message: "Restaurant not found",
        });
      }

      if (
        restaurant.ownerId &&
        restaurant.ownerId.toString() !== user._id.toString()
      ) {
        return res.status(400).json({
          success: false,
          message:
            "This restaurant is already assigned to another owner.",
        });
      }

      if (
        user.restaurantId &&
        user.restaurantId.toString() !== restaurantId.toString()
      ) {
        await Restaurant.findByIdAndUpdate(user.restaurantId, {
          ownerId: null,
        });
      }

      restaurant.ownerId = user._id;
      await restaurant.save();

      user.role = "restaurantOwner";
      user.restaurantId = restaurant._id;

      await user.save();
    }

    // ---------------------------------------------
    // Remove Restaurant Owner
    // ---------------------------------------------
    if (role === "user") {
      if (user.restaurantId) {
        await Restaurant.findByIdAndUpdate(user.restaurantId, {
          ownerId: null,
        });
      }

      user.role = "user";
      user.restaurantId = null;

      await user.save();
    }

    const updatedUser = await User.findById(user._id)
      .select("-password")
      .populate("restaurantId", "name cuisine image");

    res.status(200).json({
      success: true,

      message:
        role === "restaurantOwner"
          ? "Restaurant Owner assigned successfully"
          : "User role updated successfully",

      user: updatedUser,
    });
  } catch (error) {
    console.error("Update User Role Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to update user role",
      error: error.message,
    });
  }
};

const updateProfile = async (req, res) => {
  try {
    const {
      name,
      phone,
      address,
    } = req.body;

    const user = await User.findById(
      req.user._id
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    if (name !== undefined) {
      user.name = name;
    }

    if (phone !== undefined) {
      user.phone = phone;
    }

    if (address !== undefined) {
      user.address = address;
    }

    await user.save();

    const safeUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      phone: user.phone,
      address: user.address,
      role: user.role,
      restaurantId: user.restaurantId,
    };

    res.status(200).json({
      success: true,
      message: "Profile updated successfully",
      user: safeUser,
    });
  } catch (error) {
    console.error(
      "Update Profile Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to update profile",
    });
  }
};

// =====================================================
// EXPORTS
// =====================================================
module.exports = {
  registerUser,
  loginUser,
  registerBusiness,
  getAllUsers,
  updateUserRole,
  updateProfile,
};