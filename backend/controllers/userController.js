import asyncHandler from "express-async-handler";

import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

/**
 * @desc 		Auth user
 * @route		POST /api/users/login
 * @access	public
 */
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    await user.logLogin();

    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      jobTitle: user.jobTitle,
      address: user.address,
      dateOfJoining: user.dateOfJoining,
      department: user.department,
      status: user.status,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

/**
 * @desc 		Logout user
 * @route		POST /api/users/logout
 * @access	public
 */
const logoutUser = asyncHandler(async (req, res) => {
  const user = req.user;

  // Check if the user is not populated or doesn't exist
  if (!user) {
    res.status(401); // Unauthorized status code
    throw new Error("User not found or not authenticated");
  }

  // Log the logout activity
  await user.logLogout();

  res.json({ message: "User logged out successfully" });
});

/**
 * @desc 		Get user profile
 * @route		GET /api/users/profile
 * @access	private
 */
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id).populate("activities"); // Populate activities

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      jobTitle: user.jobTitle,
      address: user.address,
      dateOfJoining: user.dateOfJoining,
      department: user.department,
      status: user.status,
      image: user.image,
      activities: user.activities, // Ensure activities are included
      token: generateToken(user._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc 		Register new user
 * @route		POST /api/users
 * @access	public
 */
const registerUser = asyncHandler(async (req, res) => {
  const {
    name,
    email,
    password,
    isAdmin,
    jobTitle,
    address,
    dateOfJoining,
    department,
    status,
    image,
  } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = await User.create({
    name,
    email,
    password,
    isAdmin,
    jobTitle,
    address,
    dateOfJoining,
    department,
    status,
    image,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      jobTitle: user.jobTitle,
      address: user.address,
      dateOfJoining: user.dateOfJoining,
      department: user.department,
      status: user.status,
      image: user.image,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

/**
 * @desc 		Update user profile
 * @route		PUT /api/users/profile
 * @access	private
 */

const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.address = req.body.address || user.address;
    user.dateOfJoining = req.body.dateOfJoining || user.dateOfJoining;
    user.department = req.body.department || user.department;
    user.status = req.body.status || user.status;
    user.image = req.body.image || user.image;
    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      jobTitle: updatedUser.jobTitle,
      address: updatedUser.address,
      dateOfJoining: updatedUser.dateOfJoining,
      department: updatedUser.department,
      status: updatedUser.status,
      image: updatedUser.image,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc 		Get all users
 * @route		GET /api/users/
 * @access	private/admin
 */
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select("-password");
  res.json(users);
});

/**
 * @desc 		Delete user
 * @route		DELETE /api/users/:id
 * @access	private/admin
 */
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    await User.deleteOne(user);
    res.json({ message: "User deleted" });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc 		Get user by ID
 * @route		GET /api/users/:id
 * @access	private/admin
 */
const getUserByID = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.json(user);
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc 		Update a user
 * @route		PUT /api/users/:id
 * @access	private/admin
 */
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.jobTitle = req.body.jobTitle || user.jobTitle;
    user.address = req.body.address || user.address;
    user.dateOfJoining = req.body.dateOfJoining || user.dateOfJoining;
    user.department = req.body.department || user.department;
    user.status = req.body.status || user.status;
    user.image = req.body.image || user.image;

    // Update isAdmin field if provided
    if (req.body.isAdmin !== undefined) {
      user.isAdmin = req.body.isAdmin;
    }

    // Update password if provided and hash it
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(req.body.password, salt);
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      jobTitle: updatedUser.jobTitle,
      address: updatedUser.address,
      dateOfJoining: updatedUser.dateOfJoining,
      department: updatedUser.department,
      status: updatedUser.status,
      image: updatedUser.image,
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

/**
 * @desc    Submit a time-off request
 * @route   POST /api/timeoff
 * @access  Private
 */
const requestTimeOff = asyncHandler(async (req, res) => {
  const { userId, category, duration, description, attachments } = req.body;

  // Find the user who is making the time-off request
  const user = await User.findById(userId);

  if (!user) {
    res.status(404);
    throw new Error("User not found");
  }

  // Add the time-off request to the user's timeOffs array
  const timeOffRequest = {
    category,
    duration: {
      startDate: duration.startDate,
      startTime: duration.startTime,
      endDate: duration.endDate,
      endTime: duration.endTime,
    },
    description,
    attachments,
  };

  // Push the new time-off request to the user's timeOffs array and save
  user.timeOffs.push(timeOffRequest);
  await user.save();

  res.status(201).json({
    message: "Time-off request submitted successfully",
    timeOff: timeOffRequest,
  });
});

export {
  authUser,
  getUserProfile,
  registerUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  getUserByID,
  updateUser,
  logoutUser,
  requestTimeOff,
};
