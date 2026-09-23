const express = require("express");

const {
  getMyBusinessApplication,
  getAllBusinessApplications,
  approveBusinessApplication,
  rejectBusinessApplication,
} = require("../controllers/businessApplicationController");

const {
  authenticate,
  authorize,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/my",
  authenticate,
  getMyBusinessApplication
);

router.get(
  "/",
  authenticate,
  authorize("admin"),
  getAllBusinessApplications
);

router.put(
  "/:id/approve",
  authenticate,
  authorize("admin"),
  approveBusinessApplication
);

router.put(
  "/:id/reject",
  authenticate,
  authorize("admin"),
  rejectBusinessApplication
);

module.exports = router;