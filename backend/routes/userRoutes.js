import express from "express";
import {
  authUser,
  deleteUser,
  getUserByID,
  getUserProfile,
  getUsers,
  registerUser,
  updateUser,
  updateUserProfile,
  logoutUser,
  requestTimeOff,
} from "../controllers/userController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

const router = express.Router();

// Route for submitting time-off requests
router.route("/timeoff").post(protect, requestTimeOff);

// User registration and fetching all users (admin access only)
router.route("/").post(registerUser).get(protect, getUsers);

// User login and logout routes
router.route("/login").post(authUser);
router.route("/logout").post(protect, logoutUser);

// Routes for getting and updating the user's profile
router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

// Routes for admin to manage users by ID
router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

export default router;
