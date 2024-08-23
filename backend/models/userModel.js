import bcrypt from "bcryptjs";
import mongoose from "mongoose";

// Define the TimeOff schema
const timeOffSchema = mongoose.Schema(
  {
    category: {
      type: String,
      required: true,
      enum: ["Sick", "Vacation", "Maternity", "Personal Matters"], // Enum for time-off categories
    },
    duration: {
      startDate: {
        type: Date,
        required: true,
      },
      startTime: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Ensure start time is in HH:MM format
            return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
          },
          message: "Start time must be in HH:MM format",
        },
      },
      endDate: {
        type: Date,
        required: true,
      },
      endTime: {
        type: String,
        required: true,
        validate: {
          validator: function (value) {
            // Ensure end time is in HH:MM format
            return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/.test(value);
          },
          message: "End time must be in HH:MM format",
        },
      },
    },
    description: {
      type: String,
      required: true,
    },
    attachments: [
      {
        fileName: {
          type: String,
          required: true,
        },
        fileUrl: {
          type: String,
          required: true,
        },
        uploadDate: {
          type: Date,
          default: Date.now, // Automatically set to the current date and time
        },
      },
    ],
  },
  { timestamps: true } // Automatically adds createdAt and updatedAt fields
);

// Schema for shift timings (static for user reference)
const shiftTimingSchema = mongoose.Schema({
  clockInTime: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure time is in HH:MM AM/PM format
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/.test(value);
      },
      message: "Shift time must be in HH:MM AM/PM format",
    },
  },
  clockOutTime: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        // Ensure time is in HH:MM AM/PM format
        return /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/.test(value);
      },
      message: "Shift time must be in HH:MM AM/PM format",
    },
  },
});

const activitySchema = mongoose.Schema({
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
  attendance: {
    checkIn: {
      type: Date,
      required: true,
    },
    checkOut: {
      type: Date,
      default: null, // Check-out can be null initially
    },
  },
  shiftTiming: shiftTimingSchema, // Embed shift timing data
});

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
    timeOffs: [timeOffSchema],
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
    attendance: {
      checkIn: new Date(), // Actual check-in time
    },
    shiftTiming: {
      clockInTime: "8:00 AM", // You can dynamically set this based on the user’s shift schedule
      clockOutTime: "5:00 PM",
    },
  });
  await this.save();
};

userSchema.methods.logLogout = async function () {
  const lastLogin = this.activities.find(
    (activity) =>
      activity.activityType === "Login" &&
      activity.attendance &&
      !activity.attendance.checkOut
  );

  if (lastLogin) {
    lastLogin.attendance.checkOut = new Date(); // Actual check-out time
    lastLogin.save();
  } else {
    this.activities.push({
      user: this._id,
      activityType: "Logout",
      description: "User logged out",
      timestamp: new Date(), // Captures the logout time
    });
  }

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
