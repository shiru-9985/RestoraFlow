const express = require("express");

const router = express.Router();

const {
  getAnalytics
} = require("../controllers/adminController");

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");

router.get(
  "/analytics",
  authMiddleware,
  roleMiddleware("Manager", "Admin"),
  getAnalytics
);

module.exports = router;