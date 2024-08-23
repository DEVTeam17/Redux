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
router.route("/timeoff").post(protect, requestTimeOff);

router.route("/").post(registerUser).get(protect, getUsers);
router.route("/login").post(authUser);
router.route("/logout").post(protect, logoutUser);

router
  .route("/profile")
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router
  .route("/:id")
  .delete(protect, admin, deleteUser)
  .get(protect, admin, getUserByID)
  .put(protect, admin, updateUser);

export default router;
