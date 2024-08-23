import colors from "colors";
import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import morgan from "morgan"; // For HTTP request logging in development mode

import connectDB from "./config/db.js";
import { errorHandler, notFound } from "./middlewares/errorMiddleware.js";
import userRoutes from "./routes/userRoutes.js";

dotenv.config();

// Connect to the database
connectDB();

const app = express();

// Enable CORS
app.use(cors());

// Body parsing middleware
app.use(express.json());

// HTTP request logging (only in development mode)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// User-related routes
app.use("/api/users", userRoutes);

// Catch-all route for handling 404 errors
app.use(notFound);

// Error handling middleware
app.use(errorHandler);

// Set the port from environment variables or fallback to 8081
const PORT = process.env.PORT || 8081;

// Start the server
app.listen(PORT, () => {
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}.`.bold
      .yellow
  );
});
