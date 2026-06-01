const express = require("express");

const router = express.Router();

const {
  createUser,
  getAllUsers,
  deleteUser,
  changePassword
} = require(
  "../controllers/userManagementController"
);

const authMiddleware =
  require("../middleware/authMiddleware");

const roleMiddleware =
  require("../middleware/roleMiddleware");
router.put(
  "/change-password",
  authMiddleware,
  changePassword
);
router.post(
  "/create-user",
  authMiddleware,
  roleMiddleware("Admin"),
  createUser
);

router.get(
  "/users",
  authMiddleware,
  roleMiddleware("Admin"),
  getAllUsers
);

router.delete(
  "/users/:id",
  authMiddleware,
  roleMiddleware("Admin"),
  deleteUser
);

module.exports = router;