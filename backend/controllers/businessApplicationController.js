const BusinessApplication = require("../models/BusinessApplication");
const User = require("../models/User");
const Restaurant = require("../models/Restaurant");

// =====================================================
// USER - GET OWN APPLICATION
// =====================================================

const getMyBusinessApplication = async (req, res) => {
  try {
    const application =
      await BusinessApplication.findOne({
        userId: req.user._id,
      }).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      application: application || null,
    });
  } catch (error) {
    console.error("Get Business Application Error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to fetch business application",
    });
  }
};

// =====================================================
// ADMIN - GET ALL APPLICATIONS
// =====================================================

const getAllBusinessApplications = async (
  req,
  res
) => {
  try {
    const applications =
      await BusinessApplication.find()
        .populate(
          "userId",
          "name email phone role restaurantId"
        )
        .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      applications,
    });
  } catch (error) {
    console.error(
      "Get Business Applications Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to fetch business applications",
    });
  }
};

// =====================================================
// ADMIN - APPROVE
// =====================================================

const approveBusinessApplication = async (
  req,
  res
) => {
  try {
    const application =
      await BusinessApplication.findById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Business application not found",
      });
    }

    if (application.status === "approved") {
      return res.status(400).json({
        success: false,
        message: "Application already approved",
      });
    }

    const user = await User.findById(
      application.userId
    );

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "Applicant user not found",
      });
    }

    // Create restaurant
    const restaurant = await Restaurant.create({
      name: application.restaurantName,
      cuisine: application.cuisine,
      image:
        "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4",
      rating: 4.5,
      deliveryTime: "30-40 mins",
      description: application.description || "",
      ownerId: user._id,
    });

    // Change user role
    user.role = "restaurantOwner";
    user.restaurantId = restaurant._id;

    await user.save();

    application.status = "approved";
    application.reviewedAt = new Date();
    application.rejectionReason = "";

    await application.save();

    res.status(200).json({
      success: true,
      message:
        "Business approved. User is now a restaurant owner.",
      application,
      restaurant,
    });
  } catch (error) {
    console.error(
      "Approve Business Application Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to approve business application",
      error: error.message,
    });
  }
};

// =====================================================
// ADMIN - REJECT
// =====================================================

const rejectBusinessApplication = async (
  req,
  res
) => {
  try {
    const application =
      await BusinessApplication.findById(
        req.params.id
      );

    if (!application) {
      return res.status(404).json({
        success: false,
        message: "Business application not found",
      });
    }

    application.status = "rejected";
    application.rejectionReason =
      req.body.reason || "Application rejected by admin";
    application.reviewedAt = new Date();

    await application.save();

    res.status(200).json({
      success: true,
      message: "Business application rejected",
      application,
    });
  } catch (error) {
    console.error(
      "Reject Business Application Error:",
      error
    );

    res.status(500).json({
      success: false,
      message: "Failed to reject application",
      error: error.message,
    });
  }
};

module.exports = {
  getMyBusinessApplication,
  getAllBusinessApplications,
  approveBusinessApplication,
  rejectBusinessApplication,
};