import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const activitySchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User model
      required: true,
    },
    activityType: {
      type: String,
      required: true,
      enum: ["Login", "Logout", "Profile Update", "Task Completion", "Other"], // Enum for activity types
    },
    description: {
      type: String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now, // Automatically sets to the current date and time
    },
    clockInTime: {
      type: Date,
      default: () => new Date(new Date().setHours(6, 0, 0, 0)), // Default to 6:00 AM today
    },
    clockOutTime: {
      type: Date,
      default: () => new Date(new Date().setHours(15, 0, 0, 0)), // Default to 3:00 PM today
    },
  }
  // { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // Ensures that the email is unique in the database
    },
    password: {
      type: String,
      required: true,
    },
    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    department: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ["Active", "On Leave", "Terminated"], // Enum for status
      required: true,
    },
    image: {
      type: String,
      required: false, // Optional field for profile picture URL
    },
    activities: [activitySchema],
  },
  { timestamps: true }
); // Automatically adds createdAt and updatedAt fields

// Method to compare entered password with the stored hashed password
userSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.methods.logLogin = async function () {
  this.activities.push({
    user: this._id,
    activityType: "Login",
    description: "User logged in",
    timestamp: new Date(), // Captures the login time
  });
  await this.save();
};

userSchema.methods.logLogout = async function () {
  this.activities.push({
    user: this._id,
    activityType: "Logout",
    description: "User logged out",
    timestamp: new Date(), // Captures the logout time
  });
  await this.save();
};

// Pre-save hook to hash the password before saving it to the database
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
