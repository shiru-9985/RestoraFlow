const express = require("express");

const protect = require("../middleware/authMiddleware");
const authorizeRoles = require("../middleware/roleMiddleware");

const {
  getDashboardStats
} = require("../controllers/analyticsController");

const router = express.Router();

router.get(
  "/dashboard",
  protect,
  authorizeRoles("Manager", "Admin"),
  getDashboardStats
);

module.exports = router;