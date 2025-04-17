import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import booksRoute from "./routes/booksRoute.js";

// Load environment variables from .env file
dotenv.config();

const app = express();

// Use environment variables
const PORT = process.env.PORT || 5500;
const mongoDBURL = process.env.MONGODB_URL;

// Middleware
app.use(express.json()); // for parsing JSON
app.use(cors()); // for enabling CORS

// Route for home
app.get("/", (req, res) => {
  res.status(200).send("Welcome to MERN Stack Book Shop");
});

// Routes
app.use("/books", booksRoute);

// Connect to MongoDB and start server
mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });
