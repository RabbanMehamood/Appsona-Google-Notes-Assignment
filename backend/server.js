const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const cors = require("cors"); // Import cors package
const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/notes");
const config = require("config");

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration
app.use(
  cors({
    origin: ["http://localhost:5500/", "http://127.0.0.1:5500/"],
  })
);

// Middleware
app.use(express.json()); // For parsing application/json

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/notes", noteRoutes);

// Serve static files
app.use(express.static(path.join(__dirname, "../frontend")));

// Routes for serving HTML files
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/auth.html"));
});

app.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/notes.html"));
});

// Database connection
mongoose
  .connect(config.get("mongoURI"))
  .then(() => {
    console.log("Connected to MongoDB and Starting Server");
    // Start server
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Database connection error:", err));
