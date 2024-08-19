import colors from "colors";
import dotenv from "dotenv";

import connectDB from "./config/db.js";
import users from "./data/users.js";
import User from "./models/userModel.js";

dotenv.config();

connectDB();

const importData = async () => {
  try {
    await User.deleteMany();

    const createdUsers = await User.insertMany(users);
    const adminUser = createdUsers[0]._id;

    console.log(`User data imported successfully`.green.inverse);
    console.log(`Admin User ID: ${adminUser}`.cyan.underline);
    process.exit(0); // Success exit
  } catch (error) {
    console.error(`${error.message}`.red.inverse);
    process.exit(1); // Error exit
  }
};

const destroyData = async () => {
  try {
    await User.deleteMany();

    console.log(`User data destroyed`.red.inverse);
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
