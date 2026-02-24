const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors({
  origin: "https://profound-cassata-a019e2.netlify.app",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());

// MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch(err => console.log("❌ Mongo Error:", err));

// Schema
const registrationSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  college: String,
  year: String,
  branch: String,
  event: String
});

const Registration = mongoose.model("Registration", registrationSchema);

// Route
app.post("/register", async (req, res) => {
  try {
    await Registration.create(req.body);
    res.json({ message: "🎉 Registration Successful!" });
  } catch (err) {
    res.status(500).json({ message: "❌ Error Saving Data" });
  }
});

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on port ${PORT}`)
);