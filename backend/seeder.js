import colors from "colors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import users from "./data/users.js";
import activityData from "./data/activityData.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    // Insert users first
    const createdUsers = await User.insertMany(users);

    // Map activities to users based on userId and add them
    for (const activity of activityData) {
      const user = createdUsers.find(
        (user) => user._id.toString() === activity.userId
      );

      if (user) {
        user.activities.push(activity); // Add activity to the user's activities array
        await user.save(); // Save the user with the new activities
      }
    }

    console.log("Data imported successfully".green.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log("Data destroyed".red.inverse);
    process.exit(0);
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === "-d") {
  destroyData();
} else {
  importData();
}
